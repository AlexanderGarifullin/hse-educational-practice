// фильтр
function applyFilter() {

    var contesetFilterInput = document.getElementById("contestFilter");
    var contestFilterValue = contesetFilterInput.value.trim();


    var typeFilterInput = document.getElementById("typeSelect");
    var typeFilterValue = typeFilterInput.value.trim();



    var durationEl = document.getElementById("durationFilter");
    var duration = durationEl.value;




    if (contestFilterValue !== null && contestFilterValue !== "" ||
        typeFilterValue !== null && typeFilterValue !== "" ||
        duration !== null && duration !== 0)
    {
        var url = '/Contest/FilterContests?name=' + contestFilterValue + '&typeFilterValue=' + typeFilterValue + '&duration=' + duration;
  


        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })

            .then(response => response.text())
            .then(data => {
                var tableBody = document.querySelector("#contestTable tbody");
         
                tableBody.innerHTML = "";
                JSON.parse(data).forEach(contest => {
           
                    var row = document.createElement("tr");
                    row.setAttribute("data-id", contest.contestId);



                    var name = document.createElement("td");
                    name.textContent = contest.contestName;
                    row.appendChild(name);

                    var duration = document.createElement("td");
                    duration.textContent = contest.duration;
                    row.appendChild(duration);

                    var type = document.createElement("td");
                    type.textContent = contest.participationType;
                    row.appendChild(type);



                    var actionsCell = document.createElement("td");
                    actionsCell.className = "actions-cell";
                    actionsCell.style.textAlign = "right";



                    var teamButton = document.createElement("button");
                    teamButton.type = "button";
                    teamButton.className = "btn btn-primary task-trigger";
                    teamButton.textContent = "Задачи";
                    teamButton.setAttribute("data-toggle", "modal");
                    teamButton.setAttribute("data-target", "#taskModal");
                    teamButton.setAttribute("data-contest-id", contest.contestId);

                    actionsCell.appendChild(teamButton);


                    var teamButton = document.createElement("button");
                    teamButton.type = "button";
                    teamButton.className = "btn btn-primary task-trigger";
                    teamButton.textContent = "Положение";
                    teamButton.setAttribute("data-toggle", "modal");
                    teamButton.setAttribute("data-target", "#resultModal");
                    teamButton.setAttribute("data-contest-id", contest.contestId);

                    actionsCell.appendChild(teamButton);


                    var editButton = document.createElement("button");
                    editButton.type = "button";
                    editButton.className = "btn btn-primary edit-trigger";
                    editButton.textContent = "Изменить";
                    editButton.setAttribute("data-toggle", "modal");
                    editButton.setAttribute("data-target", "#editModal");
                    editButton.setAttribute("data-contest-id", contest.contestId);
                    editButton.addEventListener("click", function () {
                        var editModal = document.getElementById("editModal");
                        var modal = new bootstrap.Modal(editModal);
                        var teacherId = this.getAttribute("data-contest-id");
                        var teacherIdInput = document.getElementById("olympiadId");
                        teacherIdInput.value = teacherId;
                        modal.show();
                    });

                    actionsCell.appendChild(editButton);

                    var deleteButton = document.createElement("button");
                    deleteButton.type = "button";
                    deleteButton.className = "btn btn-danger";
                    deleteButton.textContent = "Удалить";
                    deleteButton.setAttribute("data-id", contest.contestId);
                    deleteButton.addEventListener("click", function () {
                        var teacherId = deleteButton.getAttribute("data-id");
                        deleteContest(teacherId);
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

    var name = document.getElementById("contestFilter");
    name.value = "";


    var type = document.getElementById("typeSelect");
    type.value = "";

    var year = document.getElementById("durationFilter");
    year.value = "";


    var clearFilterButton = document.getElementById("clearFilterButton");
    clearFilterButton.style.display = "none"; // Скрыть кнопку "Очистить фильтр"

    loadInitialData(); // Загрузка исходных данных таблицы
}

document.getElementById("clearFilterButton").addEventListener("click", clearFilter);


function loadInitialData() {
    fetch('/Contest/GetAllContests', {
        method: 'GET'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка при выполнении запроса');
            }
            return response.text();
        })
        .then(data => {
            var tableBody = document.querySelector("#contestTable tbody");
            tableBody.innerHTML = "";
            JSON.parse(data).forEach(contest => {

                var row = document.createElement("tr");
                row.setAttribute("data-id", contest.contestId);



                var name = document.createElement("td");
                name.textContent = contest.contestName;
                row.appendChild(name);

                var duration = document.createElement("td");
                duration.textContent = contest.duration;
                row.appendChild(duration);

                var type = document.createElement("td");
                type.textContent = contest.participationType;
                row.appendChild(type);



                var actionsCell = document.createElement("td");
                actionsCell.className = "actions-cell";
                actionsCell.style.textAlign = "right";



                var teamButton = document.createElement("button");
                teamButton.type = "button";
                teamButton.className = "btn btn-primary task-trigger";
                teamButton.textContent = "Задачи";
                teamButton.setAttribute("data-toggle", "modal");
                teamButton.setAttribute("data-target", "#taskModal");
                teamButton.setAttribute("data-contest-id", contest.contestId);

                actionsCell.appendChild(teamButton);


                var teamButton = document.createElement("button");
                teamButton.type = "button";
                teamButton.className = "btn btn-primary task-trigger";
                teamButton.textContent = "Положение";
                teamButton.setAttribute("data-toggle", "modal");
                teamButton.setAttribute("data-target", "#resultModal");
                teamButton.setAttribute("data-contest-id", contest.contestId);

                actionsCell.appendChild(teamButton);


                var editButton = document.createElement("button");
                editButton.type = "button";
                editButton.className = "btn btn-primary edit-trigger";
                editButton.textContent = "Изменить";
                editButton.setAttribute("data-toggle", "modal");
                editButton.setAttribute("data-target", "#editModal");
                editButton.setAttribute("data-contest-id", contest.contestId);
                editButton.addEventListener("click", function () {
                    var editModal = document.getElementById("editModal");
                    var modal = new bootstrap.Modal(editModal);
                    var teacherId = this.getAttribute("data-contest-id");
                    var teacherIdInput = document.getElementById("olympiadId");
                    teacherIdInput.value = teacherId;
                    modal.show();
                });

                actionsCell.appendChild(editButton);

                var deleteButton = document.createElement("button");
                deleteButton.type = "button";
                deleteButton.className = "btn btn-danger";
                deleteButton.textContent = "Удалить";
                deleteButton.setAttribute("data-id", contest.contestId);
                deleteButton.addEventListener("click", function () {
                    var teacherId = deleteButton.getAttribute("data-id");
                    deleteContest(teacherId);
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
    $('#addContest').val('');
    $('#addTypeSelect').val('');
    $('#addDuration').val('');



    // Очистка сообщений об ошибках
    $('#addContestError').text('');
    $('#addTypeSelectError').text('');
    $('#addDurationError').text('');
});


document.getElementById("addContestFromModal").addEventListener("click", function () {
    var addForm = document.getElementById("addForm");


    var contest = {
        name: addForm.elements["addContest"].value.trim() || "",
        type: addForm.elements["addTypeSelect"].value.trim() || "",
        duration: addForm.elements["addDuration"].value || ""
    };

    contest.durationInt = parseInt(contest.duration);


    var errors = validateInput(contest);

    if (errors.length > 0) {

    } else {


        var formData = new FormData();
        formData.append("name", contest.name);
        formData.append("type", contest.type);
        formData.append("duration", contest.duration);


        fetch('/Contest/AddContest', {
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
                    var cfnick = document.getElementById("addContestError");
                    cfnick.textContent = "Такой контест уже есть";
                } else {
                    console.error('Ошибка при добавлении контеста');
                }
            })
            .catch(error => {
                console.error('Ошибка при выполнении запроса');
            });
    }
})



function validateInput(contest) {
    var errors = [];


    if (!(contest.name.length >= 1 && contest.name.length <= 50)) {
        errors.push("Некорректное название контеста ");
        var lastNameError = document.getElementById("addContestError");
        lastNameError.textContent = "Некорректное название контеста";
    } else {
        var lastNameError = document.getElementById("addContestError");
        lastNameError.textContent = "";
    }


    if (contest.type.length === 0) {
        errors.push("Не выбрали тип участия ");
        var lastNameError = document.getElementById("addTypeSelectError");
        lastNameError.textContent = "Не выбрали тип участия";
    } else {
        var lastNameError = document.getElementById("addTypeSelectError");
        lastNameError.textContent = "";
    }



    if (!(contest.durationInt >= 60 && contest.durationInt <= 300)) {
        errors.push("Выберите первую сложность");
        var groupSelectError = document.getElementById("addDurationError");
        groupSelectError.textContent = "Некорректная длительность";
    } else {
        var groupSelectError = document.getElementById("addDurationError");
        groupSelectError.textContent = "";
    }

    return errors;
}



function deleteContest(contestId) {
    // Выполните POST-запрос на сервер, передавая идентификатор учителя
    fetch(`/Contest/DeleteContest?contestId=${contestId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

        .then(response => {
            if (response.ok) {
                // Если запрос успешен, удалите соответствующую строку из таблицы
                var rowToDelete = document.querySelector(`tr[data-id="${contestId}"]`);
                rowToDelete.parentNode.removeChild(rowToDelete);
            }
        })
        .catch(error => {
            console.error('Ошибка при удалении занятия:', error);
        });
}





$('#editModal').on('hidden.bs.modal', function () {
    $('#editContest').val('');
    $('#editTypeSelect').val('');
    $('#editDuration').val('');



    $('#editContestError').text('');
    $('#EditTypeSelectError').text('');
    $('#editDurationError').text('');

    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
});




$('#editModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var contestId = button.data('contest-id');
    var modal = $(this);


   
    var tableRow = $('#contestTable').find('tr[data-id="' + contestId + '"]');


    var name = tableRow.find('td:nth-child(1)').text().trim();
    var type = tableRow.find('td:nth-child(3)').text().trim();
    var duration = tableRow.find('td:nth-child(2)').text().trim();

    modal.find('#contestId').val(contestId);
    modal.find('#editContest').val(name);
    modal.find('#editDuration').val(duration);




   var selectElement1 = modal.find('#editTypeSelect');
    selectElement1.find('option').each(function () {
        if ($(this).text().trim() === type) {
            $(this).prop('selected', true);
            return false; 
        }
    });
});






// Сохранить изменения
$('#saveChangesBtn').on('click', function () {
    var addForm = document.getElementById("editForm");

    var contestId = addForm.elements["contestId"].value


    var contest = {
        name: addForm.elements["editContest"].value.trim() || "",
        type: addForm.elements["editTypeSelect"].value.trim() || "",
        duration: addForm.elements["editDuration"].value || ""
    };

    contest.durationInt = parseInt(contest.duration);



    if (!validateInputEdit(contest)) {
        return; // Если валидация не прошла, прерываем дальнейшее выполнение
    }

    var formData = new FormData();
    formData.append("contestId", contestId);
    formData.append("name", contest.name);
    formData.append("type", contest.type);
    formData.append("duration", contest.duration);



    fetch('/Contest/UpdateContest', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                loadInitialData();
                $('#editModal').modal('hide');
            } else if (response.status === 409) {
                // Ник уже занят
                var cfnick = document.getElementById("editContestError");
                cfnick.textContent = "Такой контест уже есть";
                return Promise.reject(new Error('Контест уже существует'));
            } else {
                console.error('Ошибка при добавлении контеста');
            }
        })
        .catch(error => {
            console.error('Ошибка при выполнении запроса');
        });


});



function validateInputEdit(contest) {
    var errors = [];


    if (!(contest.name.length >= 1 && contest.name.length <= 50)) {
        errors.push("Некорректное название контеста ");
        var lastNameError = document.getElementById("editContestError");
        lastNameError.textContent = "Некорректное название контеста";
    } else {
        var lastNameError = document.getElementById("editContestError");
        lastNameError.textContent = "";
    }


    if (contest.type.length === 0) {
        errors.push("Не выбрали тип участия ");
        var lastNameError = document.getElementById("editTypeSelectError");
        lastNameError.textContent = "Не выбрали тип участия";
    } else {
        var lastNameError = document.getElementById("editTypeSelectError");
        lastNameError.textContent = "";
    }



    if (!(contest.durationInt >= 60 && contest.durationInt <= 300)) {
        errors.push("Выберите первую сложность");
        var groupSelectError = document.getElementById("editDurationError");
        groupSelectError.textContent = "Некорректная длительность";
    } else {
        var groupSelectError = document.getElementById("editDurationError");
        groupSelectError.textContent = "";
    }
    return errors;
}


$('#taskModal').on('show.bs.modal', function (event) {
    // Очистка содержимого элемента сообщения об ошибке
    $('#errorMessage').empty();

    var button = $(event.relatedTarget);
    var taskId1 = button.data('contest-id');

    populateTasktTable(taskId1);
    $('#taskModal #contestId').val(taskId1);
});




function populateTasktTable(contestId) {


    fetch('/Contest/getTasksForContest/?contestId=' + contestId)
        .then(function (response) {

            return response.json();
        })
        .then(function (data) {
            // Очистить существующие строки таблицы
            var tableBody = document.querySelector("#taskTable tbody");
            tableBody.innerHTML = "";



            for (var i = 0; i < data.length; i++) {

                var row = document.createElement('tr');
                row.setAttribute('data-id', data[i].taskContestID);
                row.setAttribute('data-id-task', data[i].taskID);


                var nameCell = document.createElement('td');
                nameCell.className = 'pr-0';
                nameCell.textContent = data[i].taskModel.codeforcesTaskID;



                var actionsCell = document.createElement('td');
                actionsCell.className = 'actions-cell text-right';

                var deleteButton = document.createElement('button');
                deleteButton.type = 'button';
                deleteButton.className = 'btn btn-danger deleteTaskContest';
                deleteButton.textContent = 'Удалить';
                deleteButton.setAttribute('data-id', data[i].taskContestID);
                deleteButton.addEventListener('click', function () {
                    deleteTask(this.getAttribute('data-id'));
                });



                actionsCell.appendChild(deleteButton);

                row.appendChild(nameCell);
                row.appendChild(actionsCell);


                tableBody.appendChild(row);
            }



        })
        .catch(function (error) {
            console.error('Ошибка:', error);
        });
}



document.addEventListener('DOMContentLoaded', function () {
    var addThemeButtonTask = document.getElementById('addTaskButton');
    addThemeButtonTask.addEventListener('click', addTask);
    var addStudentBtn = document.getElementById('addStudentButton');
    addStudentBtn.addEventListener('click', addStudent);

});


function addStudent() {
    console.log('addStudent');
    var errorMessageElement = document.getElementById('errorMessageStudent');
    errorMessageElement.textContent = '';
    var selectedStudentId = parseInt(document.getElementById('studentSelect').value);
    var resaultModal = document.getElementById('resultModal');

    var resultTable = document.getElementById('resultTable');
    var resultTableBody = resultTable.querySelector('tbody');
    var existingStudent = resultTable.querySelector('tr[data-id-task="' + selectedStudentId + '"]');

        errorMessageElement.textContent = 'Студент уже добавлен';
        errorMessageElement.style.color = 'red';
}



function addTask() {
    var errorMessageElement = document.getElementById('errorMessage');
    errorMessageElement.textContent = '';

    var selectedTaskId = parseInt(document.getElementById('taskSelect').value);


    var taskModal = document.getElementById('taskModal');
    var contesetIdIdInput = taskModal.querySelector('#contestId');

    var contestId = parseInt(contesetIdIdInput.value);

    var taskTable = document.getElementById('taskTable');
    var taskTableBody = taskTable.querySelector('tbody');

    // Проверка, что тема уже не добавлена
    var existingTheme = taskTable.querySelector('tr[data-id-task="' + selectedTaskId + '"]');

    if (existingTheme) {
        // Отобразить сообщение об ошибке
        var errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = 'Задача уже добавлен';
        errorMessage.style.color = 'red';
        return;
    }

    // Отправка запроса на сервер для добавления темы
    var url = '/Contest/AddTask/?contestId=' + contestId + '&taskId=' + selectedTaskId;
    console.log('url', url);

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        if (response.ok) {
            // Очистить таблицу
            taskTableBody.innerHTML = '';

            // Вызвать функцию populateThemeTable() для обновления таблицы тем
            populateTasktTable(contestId);

        } else {
            console.error('Ошибка при добавлении студента.');
        }
    }).catch(function (error) {
        console.error('Ошибка при добавлении студента:', error);
    });
}


function deleteTask(taskContestID) {

    var errorMessageElement = document.getElementById('errorMessage');
    errorMessageElement.textContent = '';
    var row = document.querySelector('tr[data-id="' + taskContestID + '"]');
    if (row) {
        // Отправка AJAX-запроса на сервер
        fetch('/Contest/DeleteTask/?taskContestID=' + taskContestID, {
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

$('#resultModal').on('show.bs.modal', function (event) {
    // Очистка содержимого элемента сообщения об ошибке
    $('#errorMessage').empty();

    var button = $(event.relatedTarget);
    var contestId = button.data('contest-id');


    populateResultTable(contestId);
    $('#resultModal #contestId').val(contestId);
});



function populateResultTable(contestId) {
    var columnCount =1;
    fetch('/Contest/getTasksForContest/?contestId=' + contestId)
        .then(function (response) {
            return response.json(); 
        })
        .then(function (data) {
  
            var tableHead = document.querySelector("#resultTable thead");
            tableHead.innerHTML = "";

            var studentsHeader = document.createElement("th");
            studentsHeader.textContent = "Студенты";
            tableHead.appendChild(studentsHeader);

           // console.log('data', data);

            for (var i = 0; i < data.length; i++) {
                // Создание ячейки для каждого столбца
                var columnHeader = document.createElement("th");
                columnHeader.textContent = data[i].taskModel.codeforcesTaskID;
                columnHeader.setAttribute("taskContestID", data[i].taskContestID);
                tableHead.appendChild(columnHeader);
             
            }
            columnCount = tableHead.childElementCount;
            var x = document.createElement("th");
            tableHead.appendChild(x);
        })
        .catch(function (error) {
            console.error('Ошибка:', error);
        });

    fetch('/Contest/getStudentForContest/?contestId=' + contestId)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            console.log('data', data);

            var tableBody = document.querySelector("#resultTable tbody");


            for (var i = 0; i < data.length; i++) {
                var row = document.createElement("tr");

   
                var cell1 = document.createElement("td");
                cell1.textContent = data[i].studentModel.lastName + " " + data[i].studentModel.firstName + " " + data[i].studentModel.middleName + " : " +
                    data[i].studentModel.codeforcesNickname;
                cell1.setAttribute("participantId", data[i].participantID);

                row.appendChild(cell1);

                // Создание ячеек со значениями select
                for (var j = 0; j < columnCount - 1; j++) {
                    var cell = document.createElement("td");
                    var select = document.createElement("select");

                    // Создание опций выбора для select
                    var selectOptions = ["Не решена", "Дорешена", "Решена"];
                    for (var k = 0; k < selectOptions.length; k++) {
                        var option = document.createElement("option");
                        option.value = selectOptions[k];
                        option.textContent = selectOptions[k];
                        if (selectOptions[k] === "Не решена") {
                            option.selected = true; // По умолчанию выбираем "Не решена"
                        }
                        select.appendChild(option);
                    }

                    cell.appendChild(select);


                    row.appendChild(cell);
                }



                var deleteButton = document.createElement("button");
                deleteButton.type = "button";
                deleteButton.className = "btn btn-danger";
                deleteButton.textContent = "Удалить";
                deleteButton.setAttribute("data-id", contest.contestId);
                deleteButton.addEventListener("click", function () {

                });

                var actionsCell = document.createElement("td");
                actionsCell.className = "actions-cell";
                actionsCell.style.textAlign = "right";


                actionsCell.appendChild(deleteButton);

                row.appendChild(actionsCell);

                tableBody.appendChild(row);
            }


        })
        .catch(function (error) {
            console.error('Ошибка:', error);
        });


    fetch('/Contest/getStatus/?contestId=' + contestId)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('data', data);
            for (var i = 0; i < data.length; i++) {
                var participantId = data[i].participantID;
                var taskContestId = data[i].taskContestID;
                var status = data[i].solutionStatus;

                console.log('participantId', participantId);
                console.log('taskContestId', taskContestId);

                console.log('status', status);


                var selectElement = document.querySelector('td[participantid="' + participantId + '"] select[taskcontestId="' + taskContestId + '"]');
                if (selectElement) {
                    for (var j = 0; j < selectElement.options.length; j++) {
                        if (selectElement.options[j].value === status) {
                            selectElement.options[j].selected = true;
                            break;
                        }
                    }
                }

                console.log('selectElement', selectElement);

            }
        })
        .catch(function (error) {
            console.error('Error:', error);
        });


}


