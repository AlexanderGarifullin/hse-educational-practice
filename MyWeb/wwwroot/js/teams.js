// фильтр
function applyFilter() {

    var teamFilterInput = document.getElementById("teamFilter");
    var teamFilterValue = teamFilterInput.value.trim();


    if (teamFilterValue !== null && teamFilterValue !== "") {

        fetch('/Teams/FilterTeams?team=' + encodeURIComponent(teamFilterValue), {
            method: 'POST'
        })
            .then(response => response.text())
            .then(data => {
                var tableBody = document.querySelector("#teamsTable tbody");
                tableBody.innerHTML = "";
                JSON.parse(data).forEach(team => {
               
                    var row = document.createElement("tr");
                    row.setAttribute("data-id", team.teamID);


                    var name = document.createElement("td");
                    name.textContent = team.teamName;
                    row.appendChild(name);



                    var actionsCell = document.createElement("td");
                    actionsCell.className = "actions-cell";
                    actionsCell.style.textAlign = "right";


                    var teamButton = document.createElement("button");
                    teamButton.type = "button";
                    teamButton.className = "btn btn-primary student-trigger";
                    teamButton.textContent = "Состав";
                    teamButton.setAttribute("data-toggle", "modal");
                    teamButton.setAttribute("data-target", "#studentModal");
                    teamButton.setAttribute("data-team-id", team.teamID);
                    teamButton.addEventListener("click", function () {
                        var teamModal = document.getElementById("studentModal");
                        var modal = new bootstrap.Modal(teamModal);
                        var studentId = this.getAttribute("data-team-id");
                        var studentIdInput = document.getElementById("teamId");
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
                    editButton.setAttribute("data-team-id", team.teamID);
                    editButton.addEventListener("click", function () {
                        var editModal = document.getElementById("editModal");
                        var modal = new bootstrap.Modal(editModal);
                        var teacherId = this.getAttribute("data-team-id");
                        var teacherIdInput = document.getElementById("teamId");
                        teacherIdInput.value = teacherId;
                        modal.show();
                    });

                    actionsCell.appendChild(editButton);

                    var deleteButton = document.createElement("button");
                    deleteButton.type = "button";
                    deleteButton.className = "btn btn-danger";
                    deleteButton.textContent = "Удалить";
                    deleteButton.setAttribute("data-id", team.teamID);
                    deleteButton.addEventListener("click", function () {
                        var teacherId = deleteButton.getAttribute("data-id");
                        deleteTeam(teacherId);
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

document.getElementById("clearFilterButton").addEventListener("click", clearFilter);

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
    fetch('/Teams/GetAllTeams', {
        method: 'GET'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка при выполнении запроса');
            }
            return response.text();
        })
        .then(data => {
            var tableBody = document.querySelector("#teamsTable tbody");
            tableBody.innerHTML = "";
            JSON.parse(data).forEach(team => {
                var row = document.createElement("tr");
                row.setAttribute("data-id", team.teamID);


                var name = document.createElement("td");
                name.textContent = team.teamName;
                row.appendChild(name);



                var actionsCell = document.createElement("td");
                actionsCell.className = "actions-cell";
                actionsCell.style.textAlign = "right";


                var teamButton = document.createElement("button");
                teamButton.type = "button";
                teamButton.className = "btn btn-primary student-trigger";
                teamButton.textContent = "Состав";
                teamButton.setAttribute("data-toggle", "modal");
                teamButton.setAttribute("data-target", "#studentModal");
                teamButton.setAttribute("data-team-id", team.teamID);
                teamButton.addEventListener("click", function () {
                    var teamModal = document.getElementById("studentModal");
                    var modal = new bootstrap.Modal(teamModal);
                    var studentId = this.getAttribute("data-team-id");
                    var studentIdInput = document.getElementById("teamId");
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
                editButton.setAttribute("data-team-id", team.teamID);
                editButton.addEventListener("click", function () {
                    var editModal = document.getElementById("editModal");
                    var modal = new bootstrap.Modal(editModal);
                    var teacherId = this.getAttribute("data-team-id");
                    var teacherIdInput = document.getElementById("teamId");
                    teacherIdInput.value = teacherId;
                    modal.show();
                });

                actionsCell.appendChild(editButton);

                var deleteButton = document.createElement("button");
                deleteButton.type = "button";
                deleteButton.className = "btn btn-danger";
                deleteButton.textContent = "Удалить";
                deleteButton.setAttribute("data-id", team.teamID);
                deleteButton.addEventListener("click", function () {
                    var teacherId = deleteButton.getAttribute("data-id");
                    deleteTeam(teacherId);
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


// добавление
$('#addModal').on('hidden.bs.modal', function () {
    // Очистка полей ввода
    $('#addTeam').val('');

    // Очистка сообщений об ошибках
    $('#addTeamError').text('');

});



document.getElementById("addTeamFromModal").addEventListener("click", function () {
    var addForm = document.getElementById("addForm");


    var team = {
        teamName: addForm.elements["addTeam"].value.trim() || ""
    };


    console.log('team', team);

    var errors = validateInput(team);

    if (errors.length > 0) {

    } else {

        var teamName = document.getElementById("addTeam").value.trim();

        var formData = new FormData();
        formData.append("teamName", teamName);


        fetch('/Teams/AddTeam', {
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
                    var cfnick = document.getElementById("addTeamError");
                    cfnick.textContent = "Такая команда уже есть";
                } else {
                    console.error('Ошибка при добавлении команды');
                }
            })
            .catch(error => {
                console.error('Ошибка при выполнении запроса');
            });
    }
})

function validateInput(team) {
    var errors = [];

    if (!(team.teamName.length > 0 && team.teamName.length <= 50)) {
        errors.push("Некорректное название команды");
        var lastNameError = document.getElementById("addTeamError");
        lastNameError.textContent = "Некорректное название команды";
    } else {
        var lastNameError = document.getElementById("addTeamError");
        lastNameError.textContent = "";
    }
    return errors;
}


// удаление


function deleteTeam(teamId) {
    // Выполните POST-запрос на сервер, передавая идентификатор учителя
    fetch(`/Teams/DeleteTeam?teamId=${teamId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                // Если запрос успешен, удалите соответствующую строку из таблицы
                var rowToDelete = document.querySelector(`tr[data-id="${teamId}"]`);
                rowToDelete.parentNode.removeChild(rowToDelete);
            }
        })
        .catch(error => {
            console.error('Ошибка при удалении команды:', error);
        });
}

// изменение

$('#editModal').on('hidden.bs.modal', function () {
    $('#editTeam').val('');

    $('#editTeamError').text('');

    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
});


$('#editModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var teamId = button.data('team-id');
    var modal = $(this);


    // Получение строки таблицы по ID студента
    var tableRow = $('#teamsTable').find('tr[data-id="' + teamId + '"]');


    // Получение значений из ячеек строки таблицы
    var teamName = tableRow.find('td:nth-child(1)').text().trim();



    modal.find('#teamId').val(teamId);
    modal.find('#editTeam').val(teamName);



});


$('#saveChangesBtn').on('click', function () {
    var addForm = document.getElementById("editForm");


    var team = {
        teamName: addForm.elements["editTeam"].value.trim() || ""
    };



    if (!validateInputEdit(team)) {
        return; // Если валидация не прошла, прерываем дальнейшее выполнение
    }


    var teamId = addForm.elements["teamId"].value

    var teamName = document.getElementById("editTeam").value.trim();



    var formData = new FormData();
    formData.append("teamId", teamId);
    formData.append("teamName", teamName);

    fetch('/Teams/UpdateTeam', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                loadInitialData();
                $('#editModal').modal('hide');
            } else if (response.status === 409) {

                var cfnick = document.getElementById("editTeamError");
                cfnick.textContent = "Такая команда уже есть";
            } else {
                console.error('Ошибка при добавлении команды');
            }
        })
        .catch(error => {
            console.error('Ошибка при выполнении запроса');
        });


});


function validateInputEdit(team) {
    var errors = [];

    if (!(team.teamName.length > 0 && team.teamName.length <= 50)) {
        errors.push("Некорректное название команды");
        var lastNameError = document.getElementById("editTeamError");
        lastNameError.textContent = "Некорректное название команды";
    } else {
        var lastNameError = document.getElementById("editTeamError");
        lastNameError.textContent = "";
    }
    return errors;
}


// Состав

$('#studentModal').on('show.bs.modal', function (event) {
    $('#errorMessage').text('');
});



// Заполнение состава команды 

var studentsTableBody;

document.addEventListener('DOMContentLoaded', function () {
    var teamTriggerButtons = document.getElementsByClassName('student-trigger');
    var studentIdInput = document.getElementById('teamId');
    teamTableBody = document.getElementById('studentsTable').getElementsByTagName('tbody')[0];

    for (var i = 0; i < teamTriggerButtons.length; i++) {
        teamTriggerButtons[i].addEventListener('click', function () {
            var studentId = this.getAttribute('data-team-id');
            studentIdInput.value = studentId;
            populateTeamTable(studentId);
        });
    }

    var teamModal = document.getElementById('studentModal');
    teamModal.addEventListener('show.bs.modal', function (event) {
        var button = event.relatedTarget;
        var studentId = button.getAttribute('data-team-id');
        studentIdInput.value = studentId;
        populateTeamTable(studentId);
    });


    teamTableBody = document.getElementById('studentsTable').getElementsByTagName('tbody')[0];

});

function deleteStudent(participantId) {
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


function populateTeamTable(teamId) {
    fetch('/Teams/getStudentsForTeam/?teamId=' + teamId)
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
                row.setAttribute('data-id-student', data[i].studentID);
                ;

                var nameCell = document.createElement('td');
                nameCell.className = 'pr-0'; // Add the "pr-0" class
                nameCell.textContent = data[i].studentModel.lastName + " " + data[i].studentModel.firstName + " " +
                    data[i].studentModel.middleName + ": " + data[i].studentModel.codeforcesNickname;

                var actionsCell = document.createElement('td');
                actionsCell.className = 'actions-cell text-right'; // Add the "text-right" class

                var deleteButton = document.createElement('button');
                deleteButton.type = 'button';
                deleteButton.className = 'btn btn-danger deleteStudentTeam'; // Add the "deleteStudentTeam" class
                deleteButton.textContent = 'Удалить';
                deleteButton.setAttribute('data-id', data[i].participantID);
                deleteButton.addEventListener('click', function () {
                    deleteStudent(this.getAttribute('data-id'));
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





// Добавление студента в состав.
var addStudentButton = document.getElementById('addStudentButton');


addStudentButton.addEventListener('click', addTeam);


function addTeam() {
    var selectedTeamId = parseInt(studentSelect.value); 

    var studentIdInput = document.getElementById('teamId');
    var studentId = studentIdInput.value;



    var teamTable = document.getElementById('studentsTable');
    var teamTableBody = teamTable.querySelector('tbody');

    // Проверка, что студент уже не состоит в команде
    var existingTeam = teamTable.querySelector('tr[data-id-student="' + selectedTeamId + '"]');
    console.log('existingTeam:', existingTeam);
    if (existingTeam) {
        // Отобразить сообщение об ошибке
        var errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = 'Студент уже состоит в команде.';
        errorMessage.style.color = 'red';
        return;
    }

    // Отправка запроса на сервер для добавления команды
    var url = '/Teams/AddStudent/?teamId=' + studentId + '&studentId=' + selectedTeamId;

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
            var errorMessage = document.getElementById('errorMessage');
            errorMessage.textContent = '';

            addTeamModal.style.display = 'none';
        } else {
            console.error('Ошибка при добавлении команды 1.');
        }
    })
        .catch(function (error) {
            console.error('Ошибка при добавлении команды 2:', error);
        });
}

// удаление студента из команды

function deleteStudent(participantId) {

    var row = document.querySelector('tr[data-id="' + participantId + '"]');
    if (row) {
        // Отправка AJAX-запроса на сервер
        fetch('/Teams/DeleteStudent/?participantId=' + participantId, {
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