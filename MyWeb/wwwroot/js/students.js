function applyFilter() {

    var studentFilterInput = document.getElementById("studentFilter");
    var studentFilterValue = studentFilterInput.value.trim();

    var nicknameFilterInput = document.getElementById("nicknameFilter");
    var nicknameFilterValue = nicknameFilterInput.value.trim();

    var groupSelect = document.getElementById("groupSelect");
    var selectedGroupValue = groupSelect.value;



    if (studentFilterValue !== null && studentFilterValue !== "" ||
        nicknameFilterValue !== null && nicknameFilterValue !== "" ||
        selectedGroupValue !== null && selectedGroupValue !== 0) {



        fetch('/Students/FilterStudents?student=' + encodeURIComponent(studentFilterValue) + '&nick=' + encodeURIComponent(nicknameFilterValue) + '&groupId=' + encodeURIComponent(selectedGroupValue), {
            method: 'POST'
        })
            .then(response => response.text())
            .then(data => {
                var tableBody = document.querySelector("#studentTable tbody");
                tableBody.innerHTML = "";
                JSON.parse(data).forEach(student => {
                    var row = document.createElement("tr");
                    row.setAttribute("data-id", student.studentID);

                    var studentCell = document.createElement("td");
                    studentCell.textContent = student.lastName + " " + student.firstName + " " + student.middleName;
                    row.appendChild(studentCell);


                    var nickCell = document.createElement("td");
                    nickCell.textContent = student.codeforcesNickname;
                    row.appendChild(nickCell);


                    var groupCell = document.createElement("td");
                    groupCell.textContent = student.group.groupName;
                    row.appendChild(groupCell);


                    var actionsCell = document.createElement("td");
                    actionsCell.className = "actions-cell";



                    var teamButton = document.createElement("button");
                    teamButton.type = "button";
                    teamButton.className = "btn btn-primary team-trigger";
                    teamButton.textContent = "Команды";
                    teamButton.setAttribute("data-toggle", "modal");
                    teamButton.setAttribute("data-target", "#teamModal");
                    teamButton.setAttribute("data-student-id", student.studentID);
                    teamButton.addEventListener("click", function () {
                        var teamModal = document.getElementById("teamModal");
                        var modal = new bootstrap.Modal(teamModal);
                        var studentId = this.getAttribute("data-student-id");
                        var studentIdInput = document.getElementById("studentId");
                        studentIdInput.value = studentId;
                        modal.show();
                    });

                    actionsCell.appendChild(teamButton);


                    var editButton = document.createElement("button");
                    editButton.type = "button";
                    editButton.className = "btn btn-primary edit-trigger";
                    editButton.textContent = "Изменить";
                    editButton.setAttribute("data-toggle", "modal");
                    editButton.setAttribute("data-target", "#editModal");
                    editButton.setAttribute("data-student-id", student.studentID);
                    editButton.addEventListener("click", function () {
                        var editModal = document.getElementById("editModal");
                        var modal = new bootstrap.Modal(editModal);
                        var teacherId = this.getAttribute("data-student-id");
                        var teacherIdInput = document.getElementById("studentId");
                        teacherIdInput.value = teacherId;
                        modal.show();
                    });

                    actionsCell.appendChild(editButton);

                    var deleteButton = document.createElement("button");
                    deleteButton.type = "button";
                    deleteButton.className = "btn btn-danger";
                    deleteButton.textContent = "Удалить";
                    deleteButton.setAttribute("data-id", student.studentID);
                    deleteButton.addEventListener("click", function () {
                        var teacherId = deleteButton.getAttribute("data-id");
                        deleteStudent(teacherId);
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
    fetch('/Students/GetAllStudents', {
        method: 'GET'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка при выполнении запроса');
            }
            return response.text();
        })
        .then(data => {
            var tableBody = document.querySelector("#studentTable tbody");
            tableBody.innerHTML = "";
            JSON.parse(data).forEach(student => {
                var row = document.createElement("tr");
                row.setAttribute("data-id", student.studentID);

                var studentCell = document.createElement("td");
                studentCell.textContent = student.lastName + " " + student.firstName + " " + student.middleName;
                row.appendChild(studentCell);


                var nickCell = document.createElement("td");
                nickCell.textContent = student.codeforcesNickname;
                row.appendChild(nickCell);


                var groupCell = document.createElement("td");
                groupCell.textContent = student.group.groupName;
                row.appendChild(groupCell);


                var actionsCell = document.createElement("td");
                actionsCell.className = "actions-cell";



                var teamButton = document.createElement("button");
                teamButton.type = "button";
                teamButton.className = "btn btn-primary team-trigger";
                teamButton.textContent = "Команды";
                teamButton.setAttribute("data-toggle", "modal");
                teamButton.setAttribute("data-target", "#teamModal");
                teamButton.setAttribute("data-student-id", student.studentID);
                teamButton.addEventListener("click", function () {
                    var teamModal = document.getElementById("teamModal");
                    var modal = new bootstrap.Modal(teamModal);
                    var studentId = this.getAttribute("data-student-id");
                    var studentIdInput = document.getElementById("studentId");
                    studentIdInput.value = studentId;
                    modal.show();
                });

                actionsCell.appendChild(teamButton);


                var editButton = document.createElement("button");
                editButton.type = "button";
                editButton.className = "btn btn-primary edit-trigger";
                editButton.textContent = "Изменить";
                editButton.setAttribute("data-toggle", "modal");
                editButton.setAttribute("data-target", "#editModal");
                editButton.setAttribute("data-student-id", student.studentID);
                editButton.addEventListener("click", function () {
                    var editModal = document.getElementById("editModal");
                    var modal = new bootstrap.Modal(editModal);
                    var teacherId = this.getAttribute("data-student-id");
                    var teacherIdInput = document.getElementById("studentId");
                    teacherIdInput.value = teacherId;
                    modal.show();
                });

                actionsCell.appendChild(editButton);

                var deleteButton = document.createElement("button");
                deleteButton.type = "button";
                deleteButton.className = "btn btn-danger";
                deleteButton.textContent = "Удалить";
                deleteButton.setAttribute("data-id", student.studentID);
                deleteButton.addEventListener("click", function () {
                    var teacherId = deleteButton.getAttribute("data-id");
                    deleteStudent(teacherId);
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


var teamTableBody;

document.addEventListener('DOMContentLoaded', function () {
    var teamTriggerButtons = document.getElementsByClassName('team-trigger');
    var studentIdInput = document.getElementById('studentId');
    teamTableBody = document.getElementById('teamTable').getElementsByTagName('tbody')[0];

    for (var i = 0; i < teamTriggerButtons.length; i++) {
        teamTriggerButtons[i].addEventListener('click', function () {
            var studentId = this.getAttribute('data-student-id');
            studentIdInput.value = studentId;
            populateTeamTable(studentId);
        });
    }

    var teamModal = document.getElementById('teamModal');
    teamModal.addEventListener('show.bs.modal', function (event) {
        var button = event.relatedTarget;
        var studentId = button.getAttribute('data-student-id');
        studentIdInput.value = studentId;
        populateTeamTable(studentId);
    });


    teamTableBody = document.getElementById('teamTable').getElementsByTagName('tbody')[0];

});


function deleteTeam(participantId) {
    console.log('participantId:', participantId);
    var row = document.querySelector('tr[data-id="' + participantId + '"]');
    if (row) {
        // Отправка AJAX-запроса на сервер
        fetch('/Students/DeleteTeam/?participantId=' + participantId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                if (response.ok) {
                    // Удаление строки из таблицы после успешного удаления на сервере
                    row.remove();
                } else {
                    console.error('Ошибка при удалении команды.');
                }
            })
            .catch(function (error) {
                console.error('Ошибка при удалении команды:', error);
            });
    }
}


function populateTeamTable(studentId) {
    fetch('/Students/getTeamsForStudent/?studentId=' + studentId)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Clear existing table rows
            teamTableBody.innerHTML = '';

            // Populate the table with data
            for (var i = 0; i < data.length; i++) {
                var row = document.createElement('tr');
                row.setAttribute('data-id', data[i].participantID);
                row.setAttribute('data-id-team', data[i].teamID);
     ;

                var nameCell = document.createElement('td');
                nameCell.className = 'pr-0'; // Add the "pr-0" class
                nameCell.textContent = data[i].teamModel.teamName;

                var actionsCell = document.createElement('td');
                actionsCell.className = 'actions-cell text-right'; // Add the "text-right" class

                var deleteButton = document.createElement('button');
                deleteButton.type = 'button';
                deleteButton.className = 'btn btn-danger deleteStudentTeam'; // Add the "deleteStudentTeam" class
                deleteButton.textContent = 'Удалить';
                deleteButton.setAttribute('data-id', data[i].participantID);
                deleteButton.addEventListener('click', function () {
                    deleteTeam(this.getAttribute('data-id'));
                });

                actionsCell.appendChild(deleteButton);

                row.appendChild(nameCell);
                row.appendChild(actionsCell);

                teamTableBody.appendChild(row);
            }
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
}


function addTeam() {
   var selectedTeamId = parseInt(teamSelect.value); // или Number(teamSelect.value)

    var studentIdInput = document.getElementById('studentId');
    var studentId = studentIdInput.value;

    console.log('selectedTeamId:', selectedTeamId);
    console.log('studentIdInput:', studentIdInput);
    console.log('studentId:', studentId);


    var teamTable = document.getElementById('teamTable');
    var teamTableBody = teamTable.querySelector('tbody');

    // Проверка, что студент уже не состоит в команде
    var existingTeam = teamTable.querySelector('tr[data-id-team="' + selectedTeamId + '"]');
    console.log('existingTeam:', existingTeam);
    if (existingTeam) {
        // Отобразить сообщение об ошибке
        var errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = 'Студент уже состоит в команде.';
        errorMessage.style.color = 'red';
        return;
    }

    // Отправка запроса на сервер для добавления команды
    var url = '/Students/AddTeam/?studentId=' + studentId + '&teamId=' + selectedTeamId;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        if (response.ok) {
            // Очистить таблицу
            teamTableBody.innerHTML = '';

            // Вызвать функцию populateTeamTable() для обновления таблицы команд
            populateTeamTable(studentId);

            addTeamModal.style.display = 'none';
        } else {
            console.error('Ошибка при добавлении команды 1.');
        }
    })
        .catch(function (error) {
            console.error('Ошибка при добавлении команды 2:', error);
        });
}


var addTeamButton = document.getElementById('addTeamButton');


addTeamButton.addEventListener('click', addTeam);


$('#teamModal').on('show.bs.modal', function (event) {
    // Очистка содержимого элемента сообщения об ошибке
    $('#errorMessage').empty();
});


$('#addModal').on('hidden.bs.modal', function () {
    // Очистка полей ввода
    $('#addLastName').val('');
    $('#addFirstName').val('');
    $('#addMiddleName').val('');
    $('#addNickname').val('');
    $('#addGroupSelect').val('');

    // Очистка сообщений об ошибках
    $('#addLastNameError').text('');
    $('#addFirstNameError').text('');
    $('#addMiddleNameError').text('');
    $('#addNicknameError').text('');
    $('#addGroupSelectError').text('');
});



document.getElementById("addStudentFromModal").addEventListener("click", function () {
    var addForm = document.getElementById("addForm");


    var student = {
        studentFirstName: addForm.elements["addFirstName"].value.trim() || "",
        studentMiddleName: addForm.elements["addMiddleName"].value.trim() || "",
        studentLastName: addForm.elements["addLastName"].value.trim() || "",
        studentNickName: addForm.elements["addNickname"].value.trim() || "",
        groupSelect: addForm.elements["addGroupSelect"].value || ""

    };

    student.groupId = parseInt(student.groupSelect);

    console.log('student', student );

    var errors = validateInput(student);

    if (errors.length > 0) {

    } else {

        var studentMiddleNameValue = document.getElementById("addMiddleName").value.trim();

        var studentFirstNameValue = document.getElementById("addFirstName").value.trim();


        var studentLastNameValue = document.getElementById("addLastName").value.trim();


        var studentNickValue = document.getElementById("addNickname").value.trim();

        var groupSelect = document.getElementById("addGroupSelect");
        var selectedGroupValue = groupSelect.value;

        var formData = new FormData();
        formData.append("firstName", studentFirstNameValue);
        formData.append("middleName", studentMiddleNameValue);
        formData.append("lastName", studentLastNameValue);
        formData.append("nick", studentNickValue);
        formData.append("groupId", selectedGroupValue);


        fetch('/Students/AddStudent', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    $('#addModal').modal('hide');
                    addForm.reset();
                    loadInitialData();
                } else if (response.status === 409) {
                    // Ник уже занят
                    var cfnick = document.getElementById("addNicknameError");
                    cfnick.textContent = "Такой ник уже занят";
                } else {
                    console.error('Ошибка при добавлении студента');
                }
            })
            .catch(error => {
                console.error('Ошибка при выполнении запроса');
            });
    }
})



function validateInput(student) {
    var errors = [];


    var NameRegex = /^[А-Яа-яЁё]{2,50}$/;
    if (!NameRegex.test(student.studentLastName)) {
        errors.push("Некорректная фамилия");
        var lastNameError = document.getElementById("addLastNameError");
        lastNameError.textContent = "Некорректная фамилия";
    } else {
        var lastNameError = document.getElementById("addLastNameError");
        lastNameError.textContent = "";
    }

    // Validate firstName
    if (!NameRegex.test(student.studentFirstName)) {
        errors.push("Некорректное имя");
        var firstNameError = document.getElementById("addFirstNameError");
        firstNameError.textContent = "Некорректное имя";
    } else {
        var firstNameError = document.getElementById("addFirstNameError");
        firstNameError.textContent = "";
    }

    // Validate middleName
    if (student.studentMiddleName.length > 0 && !NameRegex.test(student.studentMiddleName)) {
        errors.push("Некорректное отчество");
        var middleNameError = document.getElementById("addMiddleNameError");
        middleNameError.textContent = "Некорректное отчество";
    } else {
        var middleNameError = document.getElementById("addMiddleNameError");
        middleNameError.textContent = "";
    }

    // Validate nickname
    var codeforcesPattern = /^(?=.*[A-Za-z])[A-Za-z0-9_-]{0,50}$/;

    if (codeforcesPattern.test(student.studentNickName)) {
        // Валидация прошла успешно или ник пустой
        var cfnicknameError = document.getElementById("addNicknameError");
        cfnicknameError.textContent = "";
    } else {
        // Некорректный ник
        errors.push("Некорректный ник");
        var cfnicknameError = document.getElementById("addNicknameError");
        cfnicknameError.textContent = "Некорректный ник";
    }

    if (student.groupSelect === "0" || student.groupSelect === "") {
        errors.push("Выберите преподавателя");
        var groupSelectError = document.getElementById("addGroupSelectError");
        groupSelectError.textContent = "Выберите группу";
    } else {
        var groupSelectError = document.getElementById("addGroupSelectError");
        groupSelectError.textContent = "";
    }

    return errors;
}


$('#editModal').on('hidden.bs.modal', function () {
    $('#editLastName').val('');
    $('#editFirstName').val('');
    $('#editMiddleName').val('');
    $('#editNickname').val('');
    $('#editGroupSelect').val('');


    $('#editLastNameError').text('');
    $('#editFirstNameError').text('');
    $('#editMiddleNameError').text('');
    $('#editNicknameError').text('');
    $('#editGroupSelectError').text('');

    $('body').removeClass('modal-open'); 
    $('.modal-backdrop').remove();
});

$('#editModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var studentId = button.data('student-id');
    var modal = $(this);


    // Получение строки таблицы по ID студента
    var tableRow = $('#studentTable').find('tr[data-id="' + studentId + '"]');


    // Получение значений из ячеек строки таблицы
    var fullName = tableRow.find('td:nth-child(1)').text().trim();
    var codeforcesNickname = tableRow.find('td:nth-child(2)').text().trim();
    var groupName = tableRow.find('td:nth-child(3)').text().trim();

    // Разделение полного имени на фамилию, имя и отчество
    var nameParts = fullName.split(' ');
    var lastName = nameParts[0];
    var firstName = nameParts[1];
    var middleName = nameParts[2];


    // Заполнение полей модального окна
    modal.find('#studentId').val(studentId);
    modal.find('#editLastName').val(lastName);
    modal.find('#editFirstName').val(firstName);
    modal.find('#editMiddleName').val(middleName);
    modal.find('#editNickname').val(codeforcesNickname);

    // Выбор соответствующей группы в списке
    var selectElement = modal.find('#editGroupSelect');
    selectElement.find('option').each(function () {
        if ($(this).text().trim() === groupName) {
            $(this).prop('selected', true);
            return false; // Прерывание итерации
        }
    });

    // Обновление стиля выбранного значения
    selectElement.trigger('change');

});



function validateInputEdit(student) {
    var errors = [];

    var NameRegex = /^[А-Яа-яЁё]{2,50}$/;
    if (!NameRegex.test(student.studentLastName)) {
        errors.push("Некорректная фамилия");
        var lastNameError = document.getElementById("editLastNameError");
        lastNameError.textContent = "Некорректная фамилия";
    } else {
        var lastNameError = document.getElementById("editLastNameError");
        lastNameError.textContent = "";
    }

    // Validate firstName
    if (!NameRegex.test(student.studentFirstName)) {
        errors.push("Некорректное имя");
        var firstNameError = document.getElementById("editFirstNameError");
        firstNameError.textContent = "Некорректное имя";
    } else {
        var firstNameError = document.getElementById("editFirstNameError");
        firstNameError.textContent = "";
    }

    // Validate middleName
    if (student.studentMiddleName.length > 0 && !NameRegex.test(student.studentMiddleName)) {
        errors.push("Некорректное отчество");
        var middleNameError = document.getElementById("editMiddleNameError");
        middleNameError.textContent = "Некорректное отчество";
    } else {
        var middleNameError = document.getElementById("editMiddleNameError");
        middleNameError.textContent = "";
    }

    // Validate nickname
    var codeforcesPattern = /^(?=.*[A-Za-z])[A-Za-z0-9_-]{0,50}$/;

    if (codeforcesPattern.test(student.studentNickName)) {
        // Валидация прошла успешно или ник пустой
        var cfnicknameError = document.getElementById("editNicknameError");
        cfnicknameError.textContent = "";
    } else {
        // Некорректный ник
        errors.push("Некорректный ник");
        var cfnicknameError = document.getElementById("editNicknameError");
        cfnicknameError.textContent = "Некорректный ник";
    }


    if (student.groupSelect === "0" || student.groupSelect === "") {
        errors.push("Выберите преподавателя");
        var groupSelectError = document.getElementById("editGroupSelectError");
        groupSelectError.textContent = "Выберите группу";
    } else {
        var groupSelectError = document.getElementById("editGroupSelectError");
        groupSelectError.textContent = "";
    }
    return errors;
}

$('#saveChangesBtn').on('click', function () {
    var addForm = document.getElementById("editForm");


    var student = {
        studentFirstName: addForm.elements["editFirstName"].value.trim() || "",
        studentMiddleName: addForm.elements["editMiddleName"].value.trim() || "",
        studentLastName: addForm.elements["editLastName"].value.trim() || "",
        studentNickName: addForm.elements["editNickname"].value.trim() || "",
        groupSelect: addForm.elements["editGroupSelect"].value || ""

    };

    student.groupId = parseInt(student.groupSelect);

    console.log('student', student);
    if (!validateInputEdit(student)) {
        return; // Если валидация не прошла, прерываем дальнейшее выполнение
    }
    var studentId = addForm.elements["studentId"].value

    var studentMiddleNameValue = document.getElementById("editMiddleName").value.trim();

    var studentFirstNameValue = document.getElementById("editFirstName").value.trim();


    var studentLastNameValue = document.getElementById("editLastName").value.trim();


    var studentNickValue = document.getElementById("editNickname").value.trim();

    var groupSelect = document.getElementById("editGroupSelect");
    var selectedGroupValue = groupSelect.value;

    var formData = new FormData();
    formData.append("stundetId", studentId);
    formData.append("firstName", studentFirstNameValue);
    formData.append("middleName", studentMiddleNameValue);
    formData.append("lastName", studentLastNameValue);
    formData.append("nick", studentNickValue);
    formData.append("groupId", selectedGroupValue);


    fetch('/Students/UpdateStudent', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                loadInitialData();
                $('#editModal').modal('hide');
            } else if (response.status === 409) {
                // Ник уже занят
                var cfnick = document.getElementById("editNicknameError");
                cfnick.textContent = "Такой ник уже занят";
            } else {
                console.error('Ошибка при добавлении студента');
            }
        })
        .catch(error => {
            console.error('Ошибка при выполнении запроса');
        });


});


// удаление 

function deleteStudent(studentId) {
    // Выполните POST-запрос на сервер, передавая идентификатор учителя
    fetch(`/Students/DeleteStudent?studentId=${studentId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                // Если запрос успешен, удалите соответствующую строку из таблицы
                var rowToDelete = document.querySelector(`tr[data-id="${studentId}"]`);
                rowToDelete.parentNode.removeChild(rowToDelete);
            }
        })
        .catch(error => {
            console.error('Ошибка при удалении занятия:', error);
        });
}




