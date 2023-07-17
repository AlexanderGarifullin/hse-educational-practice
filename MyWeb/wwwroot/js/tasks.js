// фильтр
function applyFilter() {

    var taskFilterInput = document.getElementById("taskFilter");
    var taskFilterValue = taskFilterInput.value.trim();



    var firstDifSelect = document.getElementById("firstDifficultySelect");
    var selectedFirstDifValue = firstDifSelect.value;

    var secondDifSelect = document.getElementById("secondDifficultySelect");
    var selectedSecondDifValue = secondDifSelect.value;



    if (taskFilterValue !== null && taskFilterValue !== "" ||
        selectedFirstDifValue !== null && selectedFirstDifValue !== 0 ||
        selectedSecondDifValue !== null && selectedSecondDifValue !== 0) {



        fetch('/Tasks/FilterTasks?task=' + encodeURIComponent(taskFilterValue) + '&firstDif=' + encodeURIComponent(selectedFirstDifValue) + '&secDifId=' + encodeURIComponent(selectedSecondDifValue), {
            method: 'POST'
        })
            .then(response => response.text())
            .then(data => {
                var tableBody = document.querySelector("#tasksTable tbody");
                tableBody.innerHTML = "";
                JSON.parse(data).forEach(task => {
                    var row = document.createElement("tr");
                    row.setAttribute("data-id", task.taskID);



                    var taskCfId = document.createElement("td");
                    taskCfId.textContent = task.codeforcesTaskID;
                    row.appendChild(taskCfId);


                    var firstDifCell = document.createElement("td");
                    firstDifCell.textContent = task.firstDifficulty.coefficient.toLocaleString("ru-RU", { minimumFractionDigits: 1 });
                    row.appendChild(firstDifCell);


                    var secondDifCell = document.createElement("td");
                    secondDifCell.textContent = task.secondDifficulty.taskWeight;
                    row.appendChild(secondDifCell);


                    var actionsCell = document.createElement("td");
                    actionsCell.className = "actions-cell";
                    actionsCell.style.textAlign = "right";


                    var teamButton = document.createElement("button");
                    teamButton.type = "button";
                    teamButton.className = "btn btn-primary task-trigger";
                    teamButton.textContent = "Темы";
                    teamButton.setAttribute("data-toggle", "modal");
                    teamButton.setAttribute("data-target", "#themeModal");
                    teamButton.setAttribute("data-task-id", task.taskID);

                    actionsCell.appendChild(teamButton);


                    var editButton = document.createElement("button");
                    editButton.type = "button";
                    editButton.className = "btn btn-primary edit-trigger";
                    editButton.textContent = "Изменить";
                    editButton.setAttribute("data-toggle", "modal");
                    editButton.setAttribute("data-target", "#editModal");
                    editButton.setAttribute("data-task-id", task.taskID);
                    editButton.addEventListener("click", function () {
                        var editModal = document.getElementById("editModal");
                        var modal = new bootstrap.Modal(editModal);
                        var teacherId = this.getAttribute("data-task-id");
                        var teacherIdInput = document.getElementById("taskId");
                        teacherIdInput.value = teacherId;
                        modal.show();
                    });

                    actionsCell.appendChild(editButton);

                    var deleteButton = document.createElement("button");
                    deleteButton.type = "button";
                    deleteButton.className = "btn btn-danger";
                    deleteButton.textContent = "Удалить";
                    deleteButton.setAttribute("data-id", task.taskID);
                    deleteButton.addEventListener("click", function () {
                        var teacherId = deleteButton.getAttribute("data-id");
                        deleteTask(teacherId);
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

// очистить фильтр

function clearFilter() {
    // Очистка текстовых полей
    var taskFilterInput = document.getElementById("taskFilter");
    taskFilterInput.value = "";

    // Очистка селектов
    var firstDifficultySelect = document.getElementById("firstDifficultySelect");
    firstDifficultySelect.value = "";

    var secondDifficultySelect = document.getElementById("secondDifficultySelect");
    secondDifficultySelect.value = "";


    var clearFilterButton = document.getElementById("clearFilterButton");
    clearFilterButton.style.display = "none"; // Скрыть кнопку "Очистить фильтр"

    loadInitialData(); // Загрузка исходных данных таблицы
}


document.getElementById("clearFilterButton").addEventListener("click", clearFilter);

// Загрузка исходных данных

function loadInitialData() {
    fetch('/Tasks/GetAllTasks', {
        method: 'GET'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка при выполнении запроса');
            }
            return response.text();
        })
        .then(data => {
            var tableBody = document.querySelector("#tasksTable tbody");
            tableBody.innerHTML = "";
            JSON.parse(data).forEach(task => {
                var row = document.createElement("tr");
                row.setAttribute("data-id", task.taskID);



                var taskCfId = document.createElement("td");
                taskCfId.textContent = task.codeforcesTaskID;
                row.appendChild(taskCfId);


                var firstDifCell = document.createElement("td");
                firstDifCell.textContent = task.firstDifficulty.coefficient.toLocaleString("ru-RU", { minimumFractionDigits: 1 });
                row.appendChild(firstDifCell);

                var secondDifCell = document.createElement("td");
                secondDifCell.textContent = task.secondDifficulty.taskWeight;
                row.appendChild(secondDifCell);


                var actionsCell = document.createElement("td");
                actionsCell.className = "actions-cell";
                actionsCell.style.textAlign = "right";




                var teamButton = document.createElement("button");
                teamButton.type = "button";
                teamButton.className = "btn btn-primary task-trigger";
                teamButton.textContent = "Темы";
                teamButton.setAttribute("data-toggle", "modal");
                teamButton.setAttribute("data-target", "#themeModal");
                teamButton.setAttribute("data-task-id", task.taskID);

                actionsCell.appendChild(teamButton);


                var editButton = document.createElement("button");
                editButton.type = "button";
                editButton.className = "btn btn-primary edit-trigger";
                editButton.textContent = "Изменить";
                editButton.setAttribute("data-toggle", "modal");
                editButton.setAttribute("data-target", "#editModal");
                editButton.setAttribute("data-task-id", task.taskID);
                editButton.addEventListener("click", function () {
                    var editModal = document.getElementById("editModal");
                    var modal = new bootstrap.Modal(editModal);
                    var teacherId = this.getAttribute("data-task-id");
                    var teacherIdInput = document.getElementById("taskId");
                    teacherIdInput.value = teacherId;
                    modal.show();
                });

                actionsCell.appendChild(editButton);

                var deleteButton = document.createElement("button");
                deleteButton.type = "button";
                deleteButton.className = "btn btn-danger";
                deleteButton.textContent = "Удалить";
                deleteButton.setAttribute("data-id", task.taskID);
                deleteButton.addEventListener("click", function () {
                    var teacherId = deleteButton.getAttribute("data-id");
                    deleteTask(teacherId);
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

// Добавление задачи

// Очистка формы
$('#addModal').on('hidden.bs.modal', function () {
    // Очистка полей ввода
    $('#addTask').val('');
    $('#addFirstDifSelect').val('');
    $('#addSecondDifSelect').val('');


    // Очистка сообщений об ошибках
    $('#addTaskError').text('');
    $('#addFirstDifSelectError').text('');
    $('#addSecondDifSelectError').text('');
});

// Добавление из задачи из модального окна 
document.getElementById("addTaskFromModal").addEventListener("click", function () {
    var addForm = document.getElementById("addForm");


    var task = {
        taskCfId: addForm.elements["addTask"].value.trim() || "",  
        firstDifSelect: addForm.elements["addFirstDifSelect"].value || "",
        secondDifSelect: addForm.elements["addSecondDifSelect"].value || ""

    };

    task.secondDifId = parseInt(task.secondDifSelect);
    task.firstDifId = parseInt(task.firstDifSelect);


    var errors = validateInput(task);

    if (errors.length > 0) {

    } else {

        var cfId = document.getElementById("addTask").value.trim();

        var firstDifSelect = document.getElementById("addFirstDifSelect");
        var selectedFirstDifValue = firstDifSelect.value;

        var secondDifSelect = document.getElementById("addSecondDifSelect");
        var selectedSecondDifValue = secondDifSelect.value;

        var formData = new FormData();
        formData.append("cfId", cfId);
        formData.append("firstDifId", selectedFirstDifValue);
        formData.append("secondDifId", selectedSecondDifValue);



        fetch('/Tasks/AddTask', {
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
                    var cfnick = document.getElementById("addTaskError");
                    cfnick.textContent = "Такая задача уже есть";
                } else {
                    console.error('Ошибка при добавлении задачи');
                }
            })
            .catch(error => {
                console.error('Ошибка при выполнении запроса');
            });
    }
})

// Проверка добавляемой задачи

function validateInput(task) {
    var errors = [];


    var cfTaskidRegex = /^[1-9]\d*[A-Za-z]$/;
    if (!cfTaskidRegex.test(task.taskCfId)) {
        errors.push("Некорректное название задачи ");
        var lastNameError = document.getElementById("addTaskError");
        lastNameError.textContent = "Некорректное название задачи";
    } else {
        var lastNameError = document.getElementById("addTaskError");
        lastNameError.textContent = "";
    }

    if (task.firstDifSelect === "0" || task.firstDifSelect === "") {
        errors.push("Выберите первую сложность");
        var groupSelectError = document.getElementById("addFirstDifSelectError");
        groupSelectError.textContent = "Выберите первую сложность";
    } else {
        var groupSelectError = document.getElementById("addFirstDifSelectError");
        groupSelectError.textContent = "";
    }

    if (task.secondDifSelect === "0" || task.secondDifSelect === "") {
        errors.push("Выберите RP");
        var groupSelectError = document.getElementById("addSecondDifSelectError");
        groupSelectError.textContent = "Выберите RP";
    } else {
        var groupSelectError = document.getElementById("addSecondDifSelectError");
        groupSelectError.textContent = "";
    }

    return errors;
}

// Удаление


function deleteTask(taskId) {
    // Выполните POST-запрос на сервер, передавая идентификатор учителя
    fetch(`/Tasks/DeleteTask?taskId=${taskId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                // Если запрос успешен, удалите соответствующую строку из таблицы
                var rowToDelete = document.querySelector(`tr[data-id="${taskId}"]`);
                rowToDelete.parentNode.removeChild(rowToDelete);
            }
        })
        .catch(error => {
            console.error('Ошибка при удалении занятия:', error);
        });
}

// Изменение

// Очищение данных при закрытии окна
$('#editModal').on('hidden.bs.modal', function () {
    $('#editTask').val('');
    $('#editFirstDifSelect').val('');
    $('#editSecondDifSelect').val('');


    $('#editTaskError').text('');
    $('#editFirstDifSelectError').text('');
    $('#editSecondDifSelectError').text('');

    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
});

// Загрузка данных в окно

$('#editModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var studentId = button.data('task-id');
    var modal = $(this);


    // Получение строки таблицы по ID студента
    var tableRow = $('#tasksTable').find('tr[data-id="' + studentId + '"]');


    // Получение значений из ячеек строки таблицы
    var taskName = tableRow.find('td:nth-child(1)').text().trim();
    var firstDifName = tableRow.find('td:nth-child(2)').text().trim();
    var secDifName = tableRow.find('td:nth-child(3)').text().trim();




    // Заполнение полей модального окна
    modal.find('#taskId').val(studentId);
    modal.find('#editTask').val(taskName);




    // Выбрать соответствующую опцию в первом селекте
    var selectElement1 = modal.find('#editFirstDifSelect');
    selectElement1.find('option').each(function () {
        if ($(this).text().trim() === firstDifName) {
            $(this).prop('selected', true);
            return false; // Прервать итерацию
        }
    });

    // Выбрать соответствующую опцию во втором селекте
    var selectElement2 = modal.find('#editSecondDifSelect');
    selectElement2.find('option').each(function () {
        if ($(this).text().trim() == secDifName) {
            $(this).prop('selected', true);
            return false; // Прервать итерацию
        }
    });

});


// Сохранить изменения
$('#saveChangesBtn').on('click', function () {
    var addForm = document.getElementById("editForm");


    var task = {
        taskName: addForm.elements["editTask"].value.trim() || "",
        firstDifSelect: addForm.elements["editFirstDifSelect"].value || "",
        secondDifSelect: addForm.elements["editSecondDifSelect"].value || ""
    };

    task.firstDifId = parseInt(task.firstDifSelect);
    task.secondDifId = parseInt(task.secondDifSelect);

   
    if (!validateInputEdit(task)) {
        return; // Если валидация не прошла, прерываем дальнейшее выполнение
    }
    var taskId = addForm.elements["taskId"].value

    var taskName = document.getElementById("editTask").value.trim();

    var firstDifSelect = document.getElementById("editFirstDifSelect");
    var selectedFirstDifValue = firstDifSelect.value;

    var secondDifSelect = document.getElementById("editSecondDifSelect");
    var selectedSecondDifValue = secondDifSelect.value;

    var formData = new FormData();
    formData.append("taskId", taskId);
    formData.append("taskName", taskName);
    formData.append("firstDifValueId", selectedFirstDifValue);
    formData.append("secondDifValueId", selectedSecondDifValue);


  

    fetch('/Tasks/UpdateTask', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                loadInitialData();
                $('#editModal').modal('hide');
            } else if (response.status === 409) {
                // Ник уже занят
                var cfnick = document.getElementById("editTaskError");
                cfnick.textContent = "Такая задача уже есть";
            } else {
                console.error('Ошибка при добавлении студента');
            }
        })
        .catch(error => {
            console.error('Ошибка при выполнении запроса');
        });


});


// Проверка данных 
function validateInputEdit(task) {
    var errors = [];


    var cfTaskidRegex = /^[1-9]\d*[A-Za-z]$/;
    if (!cfTaskidRegex.test(task.taskName)) {
        errors.push("Некорректное название задачи ");
        var lastNameError = document.getElementById("editTaskError");
        lastNameError.textContent = "Некорректное название задачи";
    } else {
        var lastNameError = document.getElementById("editTaskError");
        lastNameError.textContent = "";
    }

    if (task.firstDifSelect === "0" || task.firstDifSelect === "") {
        errors.push("Выберите первую сложность");
        var groupSelectError = document.getElementById("editFirstDifSelectError");
        groupSelectError.textContent = "Выберите первую сложность";
    } else {
        var groupSelectError = document.getElementById("editFirstDifSelectError");
        groupSelectError.textContent = "";
    }

    if (task.secondDifSelect === "0" || task.secondDifSelect === "") {
        errors.push("Выберите RP");
        var groupSelectError = document.getElementById("editSecondDifSelectError");
        groupSelectError.textContent = "Выберите RP";
    } else {
        var groupSelectError = document.getElementById("editSecondDifSelectError");
        groupSelectError.textContent = "";
    }

    return errors;
}

// Удаление задачи
function deleteTask(taskId) {
    // Выполните POST-запрос на сервер, передавая идентификатор учителя
    fetch(`/Tasks/DeleteTask?taskId=${taskId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                // Если запрос успешен, удалите соответствующую строку из таблицы
                var rowToDelete = document.querySelector(`tr[data-id="${taskId}"]`);
                rowToDelete.parentNode.removeChild(rowToDelete);
            }
        })
        .catch(error => {
            console.error('Ошибка при удалении занятия:', error);
        });
}


// Темы
$('#themeModal').on('show.bs.modal', function (event) {
    // Очистка содержимого элемента сообщения об ошибке
    $('#errorMessage').empty();

    var button = $(event.relatedTarget);
    var taskId1 = button.data('task-id');

    populateThemeTable(taskId1);
    $('#themeModal #taskId').val(taskId1);

});





document.addEventListener('DOMContentLoaded', function () {
    var addThemeButtonTask = document.getElementById('addThemeButton');
    addThemeButtonTask.addEventListener('click', addTheme);
});

function addTheme() {
    var errorMessageElement = document.getElementById('errorMessage');
    errorMessageElement.textContent = '';

    var selectedThemeId = parseInt(document.getElementById('themeSelect').value);


    var themeModal = document.getElementById('themeModal');
    var taskIdInput = themeModal.querySelector('#taskId');

    var taskId = parseInt(taskIdInput.value);

    var themeTable = document.getElementById('themeTable');
    var themeTableBody = themeTable.querySelector('tbody');

    // Проверка, что тема уже не добавлена
    var existingTheme = themeTable.querySelector('tr[data-id-theme="' + selectedThemeId + '"]');

    if (existingTheme) {
        // Отобразить сообщение об ошибке
        var errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = 'Тема уже добавлена';
        errorMessage.style.color = 'red';
        return;
    }

    // Отправка запроса на сервер для добавления темы
    var url = '/Tasks/AddTheme/?taskId=' + taskId + '&themeId=' + selectedThemeId;
    console.log('url', url);

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        if (response.ok) {
            // Очистить таблицу
            themeTableBody.innerHTML = '';

            // Вызвать функцию populateThemeTable() для обновления таблицы тем
            populateThemeTable(taskId);

        } else {
            console.error('Ошибка при добавлении темы.');
        }
    }).catch(function (error) {
        console.error('Ошибка при добавлении темы:', error);
    });
}

function populateThemeTable(taskId) {
  

    fetch('/Tasks/getThemesForTask/?taskId=' + taskId)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Очистить существующие строки таблицы
            var tableBody = document.querySelector("#themeTable tbody");
            tableBody.innerHTML = "";

            for (var i = 0; i < data.length; i++) {

                var row = document.createElement('tr');
                row.setAttribute('data-id', data[i].taskThemeID);
                row.setAttribute('data-id-theme', data[i].themeID);

                var nameCell = document.createElement('td');
                nameCell.className = 'pr-0';
                nameCell.textContent = data[i].themeModel.themeName;

                var actionsCell = document.createElement('td');
                actionsCell.className = 'actions-cell text-right';

                var deleteButton = document.createElement('button');
                deleteButton.type = 'button';
                deleteButton.className = 'btn btn-danger deleteThemeTask';
                deleteButton.textContent = 'Удалить';
                deleteButton.setAttribute('data-id', data[i].taskThemeID);
                deleteButton.addEventListener('click', function () {
                    deleteTheme(this.getAttribute('data-id'));
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

function deleteTheme(taskThemeID) {
    
    var errorMessageElement = document.getElementById('errorMessage');
    errorMessageElement.textContent = '';
    var row = document.querySelector('tr[data-id="' + taskThemeID + '"]');
    if (row) {
        // Отправка AJAX-запроса на сервер
        fetch('/Tasks/DeleteTheme/?taskThemeID=' + taskThemeID, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            if (response.ok) {
                // Удаление строки из таблицы после успешного удаления на сервере
                row.remove();
            } else {
                console.error('Ошибка при удалении темы.');
            }
        }).catch(function (error) {
            console.error('Ошибка при удалении темы:', error);
        });
    }
}
