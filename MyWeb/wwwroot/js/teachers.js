function applyFilter() {
    var lastName = document.getElementById("lastName").value.trim();
    var firstName = document.getElementById("firstName").value.trim();
    var middleName = document.getElementById("middleName").value.trim();
    var nickname = document.getElementById("nickname").value.trim();
    var position = document.getElementById("position").value.trim();

    if (lastName !== "" || firstName !== "" || middleName !== "" || nickname !== "" || position !== "") {
        var formData = new FormData();
        formData.append("lastName", lastName);
        formData.append("firstName", firstName);
        formData.append("middleName", middleName);
        formData.append("nickname", nickname);
        formData.append("position", position);

        fetch('/Teachers/FilterTeachers', {
            method: 'POST',
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                var tableBody = document.querySelector("#teacherTable tbody");
                tableBody.innerHTML = "";
                JSON.parse(data).forEach(teacher => {
                    var row = document.createElement("tr");
                    row.setAttribute("data-id", teacher.teacherID);

                    var lastNameCell = document.createElement("td");
                    lastNameCell.textContent = teacher.lastName;
                    row.appendChild(lastNameCell);

                    var firstNameCell = document.createElement("td");
                    firstNameCell.textContent = teacher.firstName;
                    row.appendChild(firstNameCell);

                    var middleNameCell = document.createElement("td");
                    middleNameCell.textContent = teacher.middleName;
                    row.appendChild(middleNameCell);

                    var nicknameCell = document.createElement("td");
                    nicknameCell.textContent = teacher.codeforcesNickname;
                    row.appendChild(nicknameCell);

                    var positionCell = document.createElement("td");
                    positionCell.textContent = teacher.position;
                    row.appendChild(positionCell);

                    var actionsCell = document.createElement("td");
                    actionsCell.className = "actions-cell";

                    var editButton = document.createElement("button");
                    editButton.type = "button";
                    editButton.className = "btn btn-primary edit-trigger";
                    editButton.textContent = "Изменить";
                    editButton.setAttribute("data-toggle", "modal");
                    editButton.setAttribute("data-target", "#editModal");
                    editButton.setAttribute("data-teacher-id", teacher.teacherID);
                    editButton.addEventListener("click", function () {
                        var editModal = document.getElementById("editModal");
                        var modal = new bootstrap.Modal(editModal);
                        var teacherId = this.getAttribute("data-teacher-id");
                        var teacherIdInput = document.getElementById("teacherId");
                        teacherIdInput.value = teacherId;
                        modal.show();
                    });

                    actionsCell.appendChild(editButton);

                    var deleteButton = document.createElement("button");
                    deleteButton.type = "button";
                    deleteButton.className = "btn btn-danger";
                    deleteButton.textContent = "Удалить";
                    deleteButton.setAttribute("data-id", teacher.teacherID);
                    deleteButton.addEventListener("click", function () {
                        var teacherId = deleteButton.getAttribute("data-id");
                        deleteTeacher(teacherId);
                    });

                    actionsCell.appendChild(deleteButton);

                    row.appendChild(actionsCell);

                    tableBody.appendChild(row);
                });
            });

        var clearFilterButton = document.getElementById("clearFilterButton");
        clearFilterButton.style.display = "inline-block";
        $('#filterModal').modal('hide');

    } else {
        clearFilter();
    }
}


function clearFilter() {
    var inputs = document.querySelectorAll("#filterModal input[type='text']");
    inputs.forEach(input => {
        input.value = ""; // Очистка значений полей ввода
    });

    var clearFilterButton = document.getElementById("clearFilterButton");
    clearFilterButton.style.display = "none"; // Скрыть кнопку "Очистить фильтр"

    loadInitialData(); // Загрузка исходных данных таблицы
}

function loadInitialData() {
    fetch('/Teachers/GetAllTeachers', {
        method: 'GET'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка при выполнении запроса');
            }
            return response.text();
        })
        .then(data => {
            var tableBody = document.querySelector("#teacherTable tbody");
            tableBody.innerHTML = "";
            JSON.parse(data).forEach(teacher => {
                var row = document.createElement("tr");
                row.setAttribute("data-id", teacher.teacherID);

                var lastNameCell = document.createElement("td");
                lastNameCell.textContent = teacher.lastName;
                row.appendChild(lastNameCell);

                var firstNameCell = document.createElement("td");
                firstNameCell.textContent = teacher.firstName;
                row.appendChild(firstNameCell);

                var middleNameCell = document.createElement("td");
                middleNameCell.textContent = teacher.middleName;
                row.appendChild(middleNameCell);

                var nicknameCell = document.createElement("td");
                nicknameCell.textContent = teacher.codeforcesNickname;
                row.appendChild(nicknameCell);

                var positionCell = document.createElement("td");
                positionCell.textContent = teacher.position;
                row.appendChild(positionCell);

                var actionsCell = document.createElement("td");
                actionsCell.className = "actions-cell";

                var editButton = document.createElement("button");
                editButton.type = "button";
                editButton.className = "btn btn-primary edit-trigger";
                editButton.textContent = "Изменить";
                editButton.setAttribute("data-toggle", "modal");
                editButton.setAttribute("data-target", "#editModal");
                editButton.setAttribute("data-teacher-id", teacher.teacherID);
                editButton.addEventListener("click", function () {
                    var editModal = document.getElementById("editModal");
                    var modal = new bootstrap.Modal(editModal);
                    var teacherId = this.getAttribute("data-teacher-id");
                    var teacherIdInput = document.getElementById("teacherId");
                    teacherIdInput.value = teacherId;
                    modal.show();
                });

                actionsCell.appendChild(editButton);

                var deleteButton = document.createElement("button");
                deleteButton.type = "button";
                deleteButton.className = "btn btn-danger";
                deleteButton.textContent = "Удалить";
                deleteButton.setAttribute("data-id", teacher.teacherID);
                deleteButton.addEventListener("click", function () {
                    var teacherId = deleteButton.getAttribute("data-id");
                    deleteTeacher(teacherId);
                });

                actionsCell.appendChild(deleteButton);

                row.appendChild(actionsCell);

                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error(error);
        });
}



document.getElementById("clearFilterButton").addEventListener("click", clearFilter);


document.getElementById("addTeacherFromModal").addEventListener("click", function () {
    var addForm = document.getElementById("addForm");

    var teacher = {
        lastName: addForm.elements["addLastName"].value.trim() ?? "",
        firstName: addForm.elements["addFirstName"].value.trim() ?? "",
        middleName: addForm.elements["addMiddleName"].value.trim() ?? "",
        nickname: addForm.elements["addNickname"].value.trim() ?? "",
        position: addForm.elements["addPosition"].value.trim() ?? ""
    };

    var errors = validateInput(teacher);

    if (errors.length > 0) {
        var errorContainer = document.getElementById("addErrorContainer");
        errorContainer.innerHTML = ""; // Clear previous error messages

        errors.forEach(error => {
            var errorText = document.createElement("div");
            errorText.className = "error-message";
            errorText.textContent = error;
            errorContainer.appendChild(errorText);
        });
    } else {
        // Proceed with adding the teacher
        var request = new Request('/Teachers/AddTeacher', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(teacher)
        });

        fetch(request)
            .then(response => {
                if (response.ok) {
                    $('#addModal').modal('hide');
                    addForm.reset();
                    loadInitialData();
                } else {
                    console.error('Ошибка при добавлении учителя');
                }
            })
            .catch(error => {
                console.error('Ошибка при выполнении запроса');
            });
    }
});


function validateInputEdit(teacher) {
    var errors = [];

    // Validate lastName
    var NameRegex = /^[А-Яа-яЁё]{2,50}$/;
    if (!NameRegex.test(teacher.lastName)) {
        errors.push("Некорректная фамилия");
        var lastNameError = document.getElementById("editLastNameError");
        lastNameError.textContent = "Некорректная фамилия";
    } else {
        var lastNameError = document.getElementById("editLastNameError");
        lastNameError.textContent = "";
    }

    // Validate firstName
    if (!NameRegex.test(teacher.firstName)) {
        errors.push("Некорректное имя");
        var firstNameError = document.getElementById("editFirstNameError");
        firstNameError.textContent = "Некорректное имя";
    } else {
        var firstNameError = document.getElementById("editFirstNameError");
        firstNameError.textContent = "";
    }

    // Validate middleName
    if (teacher.middleName.length > 0 &&!NameRegex.test(teacher.middleName)) {
        errors.push("Некорректное отчество");
        var middleNameError = document.getElementById("editMiddleNameError");
        middleNameError.textContent = "Некорректное отчество";
    } else {
        var middleNameError = document.getElementById("editMiddleNameError");
        middleNameError.textContent = "";
    }

    // Validate nickname
    var codeforcesPattern = /^(?=.*[A-Za-z])[A-Za-z0-9_-]{0,50}$/;

    if (!teacher.nickname || codeforcesPattern.test(teacher.nickname)) {
        // Валидация прошла успешно или ник пустой
        var cfnicknameError = document.getElementById("editNicknameError");
        cfnicknameError.textContent = "";
    } else {
        // Некорректный ник
        errors.push("Некорректный ник");
        var cfnicknameError = document.getElementById("editNicknameError");
        cfnicknameError.textContent = "Некорректный ник";
    }


    // Validate position

    var posPattern = /^.{2,50}$/;
    if (!posPattern.test(teacher.position)) {
        errors.push("Некорректная должность");
        var positionError = document.getElementById("editPositionError");
        positionError.textContent = "Некорректная должность";
    }
    else {
        var positionError = document.getElementById("editPositionError");
        positionError.textContent = "";
    }

    return errors;
}



$('#addModal').on('hidden.bs.modal', function () {
    // Очистка полей ввода
    $('#addLastName').val('');
    $('#addFirstName').val('');
    $('#addMiddleName').val('');
    $('#addNickname').val('');
    $('#addPosition').val('');

    // Очистка сообщений об ошибках
    $('#addLastNameError').text('');
    $('#addFirstNameError').text('');
    $('#addMiddleNameError').text('');
    $('#addNicknameError').text('');
    $('#addPositionError').text('');
});

$('#editModal').on('hidden.bs.modal', function () {
    // Очистка полей ввода
    $('#editLastName').val('');
    $('#editFirstName').val('');
    $('#editMiddleName').val('');
    $('#editNickname').val('');
    $('#editPosition').val('');

    // Очистка сообщений об ошибках
    $('#editLastNameError').text('');
    $('#editFirstNameError').text('');
    $('#editMiddleNameError').text('');
    $('#editNicknameError').text('');
    $('#editPositionError').text('');
    $('body').removeClass('modal-open'); // Удаление класса 'modal-open' у <body>
    $('.modal-backdrop').remove();
});

$('#editModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var teacherId = button.data('teacher-id');
    var modal = $(this);

    // Получение значений из выбранной строки таблицы
    var lastName = button.closest('tr').find('td:nth-child(1)').text();
    var firstName = button.closest('tr').find('td:nth-child(2)').text();
    var middleName = button.closest('tr').find('td:nth-child(3)').text();
    var nickname = button.closest('tr').find('td:nth-child(4)').text();
    var position = button.closest('tr').find('td:nth-child(5)').text();

    // Заполнение полей модального окна
    modal.find('#teacherId').val(teacherId);
    modal.find('#editLastName').val(lastName);
    modal.find('#editFirstName').val(firstName);
    modal.find('#editMiddleName').val(middleName);
    modal.find('#editNickname').val(nickname);
    modal.find('#editPosition').val(position);
});



$('#saveChangesBtn').on('click', function () {
    // Получение значений полей ввода из модального окна
    var teacherId = $('#teacherId').val();
    var lastName = $('#editLastName').val();
    var firstName = $('#editFirstName').val();
    var middleName = $('#editMiddleName').val();
    var nickname = $('#editNickname').val();
    var position = $('#editPosition').val();

    // Проверка ввода
    var teacher = {
        teacherID: teacherId,
        lastName: lastName,
        firstName: firstName,
        middleName: middleName,
        codeforcesNickname: nickname,
        position: position
    };
    if (!validateInputEdit(teacher)) {
        return; // Если валидация не прошла, прерываем дальнейшее выполнение
    }

    // Отправка запроса на обновление данных
    fetch(`/Teachers/UpdateTeacher?teacherID=${teacherId}&lastName=${lastName}&firstName=${firstName}&middleName=${middleName}&cfNickname=${nickname}&position=${position}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                var row = $('#teacherTable').find('tr[data-id="' + teacherId + '"]');
                row.find('td:nth-child(1)').text(lastName);
                row.find('td:nth-child(2)').text(firstName);
                row.find('td:nth-child(3)').text(middleName);
                row.find('td:nth-child(4)').text(nickname);
                row.find('td:nth-child(5)').text(position);

                $('#editModal').modal('hide'); // Закрываем модальное окно


            } else {
                throw new Error('Ошибка при выполнении запроса');
            }
        })
        .catch(error => {
            console.log(error);
        });
});




function validateInput(teacher) {
    var errors = [];

    // Validate lastName
    var NameRegex = /^[А-Яа-яЁё]{2,50}$/;
    if (!NameRegex.test(teacher.lastName)) {
        errors.push("Некорректная фамилия");
        var lastNameError = document.getElementById("addLastNameError");
        lastNameError.textContent = "Некорректная фамилия";
    } else {
        var lastNameError = document.getElementById("addLastNameError");
        lastNameError.textContent = "";
    }

    // Validate firstName
    if (!NameRegex.test(teacher.firstName)) {
        errors.push("Некорректное имя");
        var firstNameError = document.getElementById("addFirstNameError");
        firstNameError.textContent = "Некорректное имя";
    } else {
        var firstNameError = document.getElementById("addFirstNameError");
        firstNameError.textContent = "";
    }

    // Validate middleName
    if (teacher.middleName.length > 0 && !NameRegex.test(teacher.middleName)) {
        errors.push("Некорректное отчество");
        var middleNameError = document.getElementById("addMiddleNameError");
        middleNameError.textContent = "Некорректное отчество";
    } else {
        var middleNameError = document.getElementById("addMiddleNameError");
        middleNameError.textContent = "";
    }

    // Validate nickname
    var codeforcesPattern = /^(?=.*[A-Za-z])[A-Za-z0-9_-]{0,50}$/;

    if (!teacher.nickname || codeforcesPattern.test(teacher.nickname)) {
        // Валидация прошла успешно или ник пустой
        var cfnicknameError = document.getElementById("addNicknameError");
        cfnicknameError.textContent = "";
    } else {
        // Некорректный ник
        errors.push("Некорректный ник");
        var cfnicknameError = document.getElementById("addNicknameError");
        cfnicknameError.textContent = "Некорректный ник";
    }


    // Validate position

    var posPattern = /^.{2,50}$/;
    if (!posPattern.test(teacher.position)) {
        errors.push("Некорректная должность");
        var possitionError = document.getElementById("addPositionError");
        possitionError.textContent = "Некорректная должность";
    }
    else {
        var possitionError = document.getElementById("addPositionError");
        possitionError.textContent = "";
    }
        return errors;
}



function deleteTeacher(teacherId) {
    // Выполните POST-запрос на сервер, передавая идентификатор учителя
    fetch(`/Teachers/DeleteTeacher?teacherId=${teacherId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                // Если запрос успешен, удалите соответствующую строку из таблицы
                var rowToDelete = document.querySelector(`tr[data-id="${teacherId}"]`);
                rowToDelete.parentNode.removeChild(rowToDelete);
            }
        })
        .catch(error => {
            console.error('Ошибка при удалении учителя:', error);
        });
}
