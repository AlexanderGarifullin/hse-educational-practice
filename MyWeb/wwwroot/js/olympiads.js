// фильтр
function applyFilter() {

    var olympiadFilterInput = document.getElementById("olympiadFilter");
    var olympiadFilterValue = olympiadFilterInput.value.trim();


    var typeFilterInput = document.getElementById("typeSelect");
    var typeFilterValue = typeFilterInput.value.trim();

    

    var yearEl = document.getElementById("yearFilter");
    var year = yearEl.value;

    var bpEl = document.getElementById("bpFilter");
    var bp = bpEl.value;

    var bpPerProblemEl = document.getElementById("bpPerProblemFilter");
    var bpPerProblem = bpPerProblemEl.value;


    console.log('olympiadFilterValue', olympiadFilterValue);
    console.log('typeFilterValue', typeFilterValue);
    console.log('year', year);
    console.log('bp', bp);
    console.log('bpPerProblem', bpPerProblem);

    if (olympiadFilterValue !== null && olympiadFilterValue !== "" ||
        typeFilterValue !== null && typeFilterValue !== "" ||
        year !== null && year !== 0 ||
        bp !== null && bp !== 0 || 
        bpPerProblem !== null && bpPerProblem !== 0) {
        var url = '/Olympiads/FilterOlympiads?name=' + olympiadFilterValue + '&typeFilterValue=' + typeFilterValue + '&year=' + year +
            '&bp=' + bp + '&bpPerProblem=' + bpPerProblem;
        console.log('url', url);

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })

            .then(response => response.text())
            .then(data => {
                var tableBody = document.querySelector("#olympiadTable tbody");
                console.log('data', data);
                tableBody.innerHTML = "";
                JSON.parse(data).forEach(olympiad => {
                    console.log('olymp', olympiad);
                    var row = document.createElement("tr");
                    row.setAttribute("data-id", olympiad.olympiadID);



                    var name = document.createElement("td");
                    name.textContent = olympiad.olympiadName;
                    row.appendChild(name);

                    var type = document.createElement("td");
                    type.textContent = olympiad.participationType;
                    row.appendChild(type);


                    var year = document.createElement("td");
                    year.textContent = olympiad.year;
                    row.appendChild(year);


                    var bp = document.createElement("td");
                    bp.textContent = olympiad.baseWeight;
                    row.appendChild(bp);

                    var weightPerProblem = document.createElement("td");
                    weightPerProblem.textContent = olympiad.weightPerProblem;
                    row.appendChild(weightPerProblem);


                    var actionsCell = document.createElement("td");
                    actionsCell.className = "actions-cell";
                    actionsCell.style.textAlign = "right";


                    var teamButton = document.createElement("button");
                    teamButton.type = "button";
                    teamButton.className = "btn btn-primary task-trigger";
                    teamButton.textContent = "Положение";
                    teamButton.setAttribute("data-toggle", "modal");
                    teamButton.setAttribute("data-target", "#resultModal");
                    teamButton.setAttribute("data-olympiad-id", olympiad.olympiadID);

                    actionsCell.appendChild(teamButton);


                    var editButton = document.createElement("button");
                    editButton.type = "button";
                    editButton.className = "btn btn-primary edit-trigger";
                    editButton.textContent = "Изменить";
                    editButton.setAttribute("data-toggle", "modal");
                    editButton.setAttribute("data-target", "#editModal");
                    editButton.setAttribute("data-olympiad-id", olympiad.olympiadID);
                    editButton.addEventListener("click", function () {
                        var editModal = document.getElementById("editModal");
                        var modal = new bootstrap.Modal(editModal);
                        var teacherId = this.getAttribute("data-olympiad-id");
                        var teacherIdInput = document.getElementById("olympiadId");
                        teacherIdInput.value = teacherId;
                        modal.show();
                    });

                    actionsCell.appendChild(editButton);

                    var deleteButton = document.createElement("button");
                    deleteButton.type = "button";
                    deleteButton.className = "btn btn-danger";
                    deleteButton.textContent = "Удалить";
                    deleteButton.setAttribute("data-id", olympiad.olympiadID);
                    deleteButton.addEventListener("click", function () {
                        var teacherId = deleteButton.getAttribute("data-id");
                        deleteOlympiad(teacherId);
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
 
    var name = document.getElementById("olympiadFilter");
    name.value = "";

   
    var type = document.getElementById("typeSelect");
    type.value = "";

    var year = document.getElementById("yearFilter");
    year.value = "";

    var bp = document.getElementById("bpFilter");
    bp.value = "";

    var weightPerProblem = document.getElementById("bpPerProblemFilter");
    weightPerProblem.value = "";

    var clearFilterButton = document.getElementById("clearFilterButton");
    clearFilterButton.style.display = "none"; // Скрыть кнопку "Очистить фильтр"

    loadInitialData(); // Загрузка исходных данных таблицы
}

document.getElementById("clearFilterButton").addEventListener("click", clearFilter);

function loadInitialData() {
    fetch('/Olympiads/GetAllOlympiads', {
        method: 'GET'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка при выполнении запроса');
            }
            return response.text();
        })
        .then(data => {
                var tableBody = document.querySelector("#olympiadTable tbody");
                console.log('data', data);
                tableBody.innerHTML = "";
                JSON.parse(data).forEach(olympiad => {
                    console.log('olymp', olympiad);
                    var row = document.createElement("tr");
                    row.setAttribute("data-id", olympiad.olympiadID);



                    var name = document.createElement("td");
                    name.textContent = olympiad.olympiadName;
                    row.appendChild(name);

                    var type = document.createElement("td");
                    type.textContent = olympiad.participationType;
                    row.appendChild(type);


                    var year = document.createElement("td");
                    year.textContent = olympiad.year;
                    row.appendChild(year);


                    var bp = document.createElement("td");
                    bp.textContent = olympiad.baseWeight;
                    row.appendChild(bp);

                    var weightPerProblem = document.createElement("td");
                    weightPerProblem.textContent = olympiad.weightPerProblem;
                    row.appendChild(weightPerProblem);


                    var actionsCell = document.createElement("td");
                    actionsCell.className = "actions-cell";
                    actionsCell.style.textAlign = "right";


                    var teamButton = document.createElement("button");
                    teamButton.type = "button";
                    teamButton.className = "btn btn-primary task-trigger";
                    teamButton.textContent = "Положение";
                    teamButton.setAttribute("data-toggle", "modal");
                    teamButton.setAttribute("data-target", "#resultModal");
                    teamButton.setAttribute("data-olympiad-id", olympiad.olympiadID);

                    actionsCell.appendChild(teamButton);



                    var editButton = document.createElement("button");
                    editButton.type = "button";
                    editButton.className = "btn btn-primary edit-trigger";
                    editButton.textContent = "Изменить";
                    editButton.setAttribute("data-toggle", "modal");
                    editButton.setAttribute("data-target", "#editModal");
                    editButton.setAttribute("data-olympiad-id", olympiad.olympiadID);
                    editButton.addEventListener("click", function () {
                        var editModal = document.getElementById("editModal");
                        var modal = new bootstrap.Modal(editModal);
                        var teacherId = this.getAttribute("data-olympiad-id");
                        var teacherIdInput = document.getElementById("olympiadId");
                        teacherIdInput.value = teacherId;
                        modal.show();
                    });

                    actionsCell.appendChild(editButton);

                    var deleteButton = document.createElement("button");
                    deleteButton.type = "button";
                    deleteButton.className = "btn btn-danger";
                    deleteButton.textContent = "Удалить";
                    deleteButton.setAttribute("data-id", olympiad.olympiadID);
                    deleteButton.addEventListener("click", function () {
                        var teacherId = deleteButton.getAttribute("data-id");
                        deleteOlympiad(teacherId);
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


$('#addModal').on('hidden.bs.modal', function () {
    // Очистка полей ввода
    $('#addOlympiad').val('');
    $('#addTypeSelect').val('');
    $('#addYear').val('');
    $('#addBp').val('');
    $('#addWeightPerProblem').val('');


    // Очистка сообщений об ошибках
    $('#addOlympiadError').text('');
    $('#addTypeSelectError').text('');
    $('#addYearError').text('');
    $('#addBpError').text('');
    $('#addWeightPerProblemError').text('');
});

document.getElementById("addOlympiadFromModal").addEventListener("click", function () {
    var addForm = document.getElementById("addForm");


    var olymp = {
        name: addForm.elements["addOlympiad"].value.trim() || "",
        type: addForm.elements["addTypeSelect"].value.trim() || "",
        year: addForm.elements["addYear"].value || "",
        bp: addForm.elements["addBp"].value || "",
        weight: addForm.elements["addWeightPerProblem"].value || ""
    };

    olymp.yearInt = parseInt(olymp.year);
    olymp.bpInt = parseInt(olymp.bp);
    olymp.weightInt = parseInt(olymp.weight);


    var errors = validateInput(olymp);

    if (errors.length > 0) {

    } else {


        var formData = new FormData();
        formData.append("name", olymp.name  );
        formData.append("type", olymp.type );
        formData.append("year", olymp.year );
        formData.append("bp", olymp.bp );
        formData.append("weight", olymp.weight);


        fetch('/Olympiads/AddOlympiad', {
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
                    var cfnick = document.getElementById("addOlympiadError");
                    cfnick.textContent = "Такая олимпиада уже есть";
                } else {
                    console.error('Ошибка при добавлении задачи');
                }
            })
            .catch(error => {
                console.error('Ошибка при выполнении запроса');
            });
    }
})



function validateInput(olymp) {
    var errors = [];


    if (!(olymp.name.length >= 1 && olymp.name.length <= 50)) {
        errors.push("Некорректное название олимпиады ");
        var lastNameError = document.getElementById("addOlympiadError");
        lastNameError.textContent = "Некорректное название олимпиады";
    } else {
        var lastNameError = document.getElementById("addOlympiadError");
        lastNameError.textContent = "";
    }

    console.log('olymp.type', olymp.type);

    if (olymp.type.length === 0) {
        errors.push("Некорректное название олимпиады ");
        var lastNameError = document.getElementById("addTypeSelectError");
        lastNameError.textContent = "Не выбрали тип участия";
    } else {
        var lastNameError = document.getElementById("addTypeSelectError");
        lastNameError.textContent = "";
    }



    if (!(olymp.yearInt >= 2022 && olymp.yearInt<=2023)) {
        errors.push("Выберите первую сложность");
        var groupSelectError = document.getElementById("addYearError");
        groupSelectError.textContent = "Некорректный год проведения";
    } else {
        var groupSelectError = document.getElementById("addYearError");
        groupSelectError.textContent = "";
    }

    if (olymp.bp === "0" || olymp.bp === "") {
        errors.push("Выберите RP");
        var groupSelectError = document.getElementById("addBpError");
        groupSelectError.textContent = "Некооретное BP";
    } else {
        var groupSelectError = document.getElementById("addBpError");
        groupSelectError.textContent = "";
    }


    if (olymp.weight === "0" || olymp.weight === "") {
        errors.push("Выберите RP");
        var groupSelectError = document.getElementById("addWeightPerProblemError");
        groupSelectError.textContent = "Некорректный вес за задачу";
    } else {
        var groupSelectError = document.getElementById("addWeightPerProblemError");
        groupSelectError.textContent = "";
    }


    return errors;
}

function deleteOlympiad(olympiadId) {
    // Выполните POST-запрос на сервер, передавая идентификатор учителя
    fetch(`/Olympiads/DeleteOlympiad?olympiadId=${olympiadId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

        .then(response => {
            if (response.ok) {
                // Если запрос успешен, удалите соответствующую строку из таблицы
                var rowToDelete = document.querySelector(`tr[data-id="${olympiadId}"]`);
                rowToDelete.parentNode.removeChild(rowToDelete);
            }
        })
        .catch(error => {
            console.error('Ошибка при удалении занятия:', error);
        });
}



$('#editModal').on('hidden.bs.modal', function () {
    $('#editOlympiad').val('');
    $('#editTypeSelect').val('');
    $('#EditYear').val('');
    $('#editBp').val('');
    $('#editBpError').val('');



    $('#editOlympiadError').text('');
    $('#EditTypeSelectError').text('');
    $('#editYearError').text('');
    $('#editBpError').text('');
    $('#editWeightPerProblemError').text('');


    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
});



$('#editModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var studentId = button.data('olympiad-id');
    var modal = $(this);


    // Получение строки таблицы по ID студента
    var tableRow = $('#olympiadTable').find('tr[data-id="' + studentId + '"]');


    // Получение значений из ячеек строки таблицы

    var name = tableRow.find('td:nth-child(1)').text().trim();
    var type = tableRow.find('td:nth-child(2)').text().trim();
    var year = tableRow.find('td:nth-child(3)').text().trim();
    var bp = tableRow.find('td:nth-child(4)').text().trim();
    var weight = tableRow.find('td:nth-child(5)').text().trim();




    // Заполнение полей модального окна
    modal.find('#olympiadId').val(studentId);
    modal.find('#editOlympiad').val(name);
    modal.find('#EditYear').val(year);
    modal.find('#editBp').val(bp);
    modal.find('#editWeightPerProblem').val(weight);





    // Выбрать соответствующую опцию в первом селекте
    var selectElement1 = modal.find('#editTypeSelect');
    selectElement1.find('option').each(function () {
        if ($(this).text().trim() === type) {
            $(this).prop('selected', true);
            return false; // Прервать итерацию
        }
    });



});



// Сохранить изменения
$('#saveChangesBtn').on('click', function () {
    var addForm = document.getElementById("editForm");

    var olympiadId = addForm.elements["olympiadId"].value


    var olymp = {
        name: addForm.elements["editOlympiad"].value.trim() || "",
        type: addForm.elements["editTypeSelect"].value.trim() || "",
        year: addForm.elements["EditYear"].value || "",
        bp: addForm.elements["editBp"].value || "",
        weight: addForm.elements["editWeightPerProblem"].value || ""
    };

    olymp.yearInt = parseInt(olymp.year);
    olymp.bpInt = parseInt(olymp.bp);
    olymp.weightInt = parseInt(olymp.weight);




    if (!validateInputEdit(olymp)) {
        return; // Если валидация не прошла, прерываем дальнейшее выполнение
    }

    var formData = new FormData();
    formData.append("olympiadId", olympiadId);
    formData.append("name", olymp.name);
    formData.append("type", olymp.type);
    formData.append("year", olymp.year);
    formData.append("bp", olymp.bp);
    formData.append("weight", olymp.weight);


    fetch('/Olympiads/UpdateOlympiad', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                loadInitialData();
                $('#editModal').modal('hide');
            } else if (response.status === 409) {
                // Ник уже занят
                var cfnick = document.getElementById("editOlympiadError");
                cfnick.textContent = "Такая олимпиада уже есть";
            } else {
                console.error('Ошибка при добавлении студента');
            }
        })
        .catch(error => {
            console.error('Ошибка при выполнении запроса');
        });


});


function validateInputEdit(olymp) {
    var errors = [];


    if (!(olymp.name.length >= 1 && olymp.name.length <= 50)) {
        errors.push("Некорректное название олимпиады ");
        var lastNameError = document.getElementById("editOlympiadError");
        lastNameError.textContent = "Некорректное название олимпиады";
    } else {
        var lastNameError = document.getElementById("editOlympiadError");
        lastNameError.textContent = "";
    }

    console.log('olymp.type', olymp.type);

    if (olymp.type.length === 0) {
        errors.push("Некорректное название олимпиады ");
        var lastNameError = document.getElementById("EditTypeSelectError");
        lastNameError.textContent = "Не выбрали тип участия";
    } else {
        var lastNameError = document.getElementById("EditTypeSelectError");
        lastNameError.textContent = "";
    }



    if (!(olymp.yearInt >= 2022 && olymp.yearInt <= 2023)) {
        errors.push("Выберите первую сложность");
        var groupSelectError = document.getElementById("editYearError");
        groupSelectError.textContent = "Некорректный год проведения";
    } else {
        var groupSelectError = document.getElementById("editYearError");
        groupSelectError.textContent = "";
    }

    if (olymp.bp === "0" || olymp.bp === "") {
        errors.push("Выберите RP");
        var groupSelectError = document.getElementById("editBpError");
        groupSelectError.textContent = "Некооретное BP";
    } else {
        var groupSelectError = document.getElementById("editBpError");
        groupSelectError.textContent = "";
    }


    if (olymp.weight === "0" || olymp.weight === "") {
        errors.push("Выберите RP");
        var groupSelectError = document.getElementById("editWeightPerProblemError");
        groupSelectError.textContent = "Некорректный вес за задачу";
    } else {
        var groupSelectError = document.getElementById("editWeightPerProblemError");
        groupSelectError.textContent = "";
    }
    return errors;
}


$('#resultModal').on('show.bs.modal', function (event) {
    // Очистка содержимого элемента сообщения об ошибке
    $('#errorMessage').empty();

    var button = $(event.relatedTarget);
    var taskId1 = button.data('olympiad-id');

    populateResultTable(taskId1);
    $('#resultModal #olympiadId').val(taskId1);
});



function populateResultTable(olympiadId) {


    fetch('/Olympiads/getStudentForOlympiad/?olympiadId=' + olympiadId)
        .then(function (response) {
            console.log('response', response);

            return response.json();
        })
        .then(function (data) {
            // Очистить существующие строки таблицы
            var tableBody = document.querySelector("#resultTable tbody");
            tableBody.innerHTML = "";

            console.log('data', data);

            for (var i = 0; i < data.length; i++) {

                var row = document.createElement('tr');
                row.setAttribute('data-id', data[i].participantOlympiadID);
                row.setAttribute('data-id-participant', data[i].participantID);
                row.setAttribute('data-id-student', data[i].participantModel.studentID);


                var nameCell = document.createElement('td');
                nameCell.className = 'pr-0';
                nameCell.textContent = data[i].participantModel.studentModel.lastName + " "
                    + data[i].participantModel.studentModel.firstName +
                    " " + data[i].participantModel.studentModel.middleName + ": "
                    + data[i].participantModel.studentModel.codeforcesNickname;

                var numberCell = document.createElement('td');
                numberCell.className = 'pr-0';



                var numberInput = document.createElement('input');
                numberInput.type = 'number';
                numberInput.className = 'form-control';
                numberInput.value = data[i].solvedProblemsCount;
                numberInput.min = '0';
                numberInput.max = '999';

                numberInput.addEventListener('input', handleInputChange); 

                numberCell.appendChild(numberInput);

                var actionsCell = document.createElement('td');
                actionsCell.className = 'actions-cell text-right';

                var deleteButton = document.createElement('button');
                deleteButton.type = 'button';
                deleteButton.className = 'btn btn-danger deleteStudentOlympiad';
                deleteButton.textContent = 'Удалить';
                deleteButton.setAttribute('data-id', data[i].participantOlympiadID);
                deleteButton.addEventListener('click', function () {
                    deleteStudent(this.getAttribute('data-id'));
                });



                actionsCell.appendChild(deleteButton);

                row.appendChild(nameCell);
                row.appendChild(numberCell);
                row.appendChild(actionsCell);


                tableBody.appendChild(row);
            }



        })
        .catch(function (error) {
            console.error('Ошибка:', error);
        });
}



document.addEventListener('DOMContentLoaded', function () {
    var addThemeButtonTask = document.getElementById('addStudentButton');
    addThemeButtonTask.addEventListener('click', addStudent);
});



function addStudent() {
    var errorMessageElement = document.getElementById('errorMessage');
    errorMessageElement.textContent = '';

    var selectedStudentId = parseInt(document.getElementById('studentSelect').value);


    var resultModal = document.getElementById('resultModal');
    var olympiadIdInput = resultModal.querySelector('#olympiadId');

    var olympiadId = parseInt(olympiadIdInput.value);

    var resultTable = document.getElementById('resultTable');
    var resultTableBody = resultTable.querySelector('tbody');

    // Проверка, что тема уже не добавлена
    var existingTheme = resultTable.querySelector('tr[data-id-student="' + selectedStudentId + '"]');

    if (existingTheme) {
        // Отобразить сообщение об ошибке
        var errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = 'Студент уже добавлен';
        errorMessage.style.color = 'red';
        return;
    }

    // Отправка запроса на сервер для добавления темы
    var url = '/Olympiads/AddStudent/?olympiadId=' + olympiadId + '&studentId=' + selectedStudentId;
    console.log('url', url);

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        if (response.ok) {
            // Очистить таблицу
            resultTableBody.innerHTML = '';

            // Вызвать функцию populateThemeTable() для обновления таблицы тем
            populateResultTable(olympiadId);

        } else {
            console.error('Ошибка при добавлении студента.');
        }
    }).catch(function (error) {
        console.error('Ошибка при добавлении студента:', error);
    });
}



function deleteStudent(participantOlympiadId) {

    var errorMessageElement = document.getElementById('errorMessage');
    errorMessageElement.textContent = '';
    var row = document.querySelector('tr[data-id="' + participantOlympiadId + '"]');
    if (row) {
        // Отправка AJAX-запроса на сервер
        fetch('/Olympiads/DeleteStudent/?participantOlympiadId=' + participantOlympiadId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            if (response.ok) {
                // Удаление строки из таблицы после успешного удаления на сервере
                row.remove();
            } else {
                console.error('Ошибка при удалении студента.');
            }
        }).catch(function (error) {
            console.error('Ошибка при удалении студента:', error);
        });
    }
}


function handleInputChange(event) {
    var inputValue = event.target.value;
    var isValid = inputValue >= 0 && inputValue <= 999;

    if (isValid) {
        event.target.style.color = 'black'; 
    } else {
        event.target.style.color = 'red'; 
    }
}


$('#resultModal').on('hide.bs.modal', function () {

    var tableRows = document.querySelectorAll("#resultTable tbody tr");
    for (var i = 0; i < tableRows.length; i++) {
        var row = tableRows[i];
        var participantOlympiadID = row.getAttribute('data-id');
        var numberInput = row.querySelector('.form-control');
        var newValue = numberInput.value;
        console.log('participantOlympiadID', participantOlympiadID);
        console.log('newValue', newValue)


      updateValueInDatabase(participantOlympiadID, newValue);
    }
});

function updateValueInDatabase(participantOlympiadID, newValue) {

    fetch('/Olympiads/updateValueInDatabase/?participantOlympiadID=' + participantOlympiadID + '&newValue=' + newValue, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {

    }).catch(function (error) {
        console.error('Ошибка при изменении числа задач:', error);
    });
}