function applyFilter() {

    var lessonDateInput = document.getElementById("lessonDate");
    var lessonDateValue = lessonDateInput.value;

    var lessonTopic = document.getElementById("lessonTopic").value.trim();

    var teacherSelect = document.getElementById("teacherSelect");
    var selectedTeacherValue = teacherSelect.value;



    if (lessonDateValue !== null && lessonDateValue !== "" ||
        lessonTopic !== null && lessonTopic !== "" ||
        selectedTeacherValue !== null && selectedTeacherValue !== "")
    {
        var formData = new FormData();
        formData.append("date", lessonDateValue);
        formData.append("topic", lessonTopic);
        formData.append("teach", selectedTeacherValue);


        fetch('/Lessons/FilterLessons', {
            method: 'POST',
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                var tableBody = document.querySelector("#lessonTable tbody");
                tableBody.innerHTML = "";
                JSON.parse(data).forEach(lesson => {
                    var row = document.createElement("tr");
                    row.setAttribute("data-id", lesson.lessonID);

                    var dateCell = document.createElement("td");
                    dateCell.textContent = new Date(lesson.lessonDate).toLocaleDateString("ru-RU");
                    row.appendChild(dateCell);

                    var topicCell = document.createElement("td");
                    topicCell.textContent = lesson.lessonTopic;
                    row.appendChild(topicCell);

                    var teacherCell = document.createElement("td");
                    teacherCell.textContent = lesson.teacher.lastName + " " + lesson.teacher.firstName + " " + lesson.teacher.middleName;
                    row.appendChild(teacherCell);

                   

                    var actionsCell = document.createElement("td");
                    actionsCell.className = "actions-cell";

                    var editButton = document.createElement("button");
                    editButton.type = "button";
                    editButton.className = "btn btn-primary edit-trigger";
                    editButton.textContent = "Изменить";
                    editButton.setAttribute("data-toggle", "modal");
                    editButton.setAttribute("data-target", "#editModal");
                    editButton.setAttribute("data-lesson-id", lesson.lessonID);
                    editButton.addEventListener("click", function () {
                        var editModal = document.getElementById("editModal");
                        var modal = new bootstrap.Modal(editModal);
                        var teacherId = this.getAttribute("data-lesson-id");
                        var teacherIdInput = document.getElementById("lessonId");
                        teacherIdInput.value = teacherId;
                        modal.show();
                    });

                    actionsCell.appendChild(editButton);

                    var deleteButton = document.createElement("button");
                    deleteButton.type = "button";
                    deleteButton.className = "btn btn-danger";
                    deleteButton.textContent = "Удалить";
                    deleteButton.setAttribute("data-id", lesson.lessonID);
                    deleteButton.addEventListener("click", function () {
                        var teacherId = deleteButton.getAttribute("data-id");
                        deleteLesson(teacherId);
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
    fetch('/Lessons/GetAllLessons', {
        method: 'GET'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка при выполнении запроса');
            }
            return response.text();
        })
        .then(data => {
            var tableBody = document.querySelector("#lessonTable tbody");
            tableBody.innerHTML = "";
            JSON.parse(data).forEach(lesson => {
                var row = document.createElement("tr");
                row.setAttribute("data-id", lesson.lessonID);

                var dateCell = document.createElement("td");
                dateCell.textContent = new Date(lesson.lessonDate).toLocaleDateString("ru-RU");
                row.appendChild(dateCell);

                var topicCell = document.createElement("td");
                topicCell.textContent = lesson.lessonTopic;
                row.appendChild(topicCell);

                var teacherCell = document.createElement("td");
                teacherCell.textContent = lesson.teacher.lastName + " " + lesson.teacher.firstName + " " + lesson.teacher.middleName;
                row.appendChild(teacherCell);



                var actionsCell = document.createElement("td");
                actionsCell.className = "actions-cell";

                var editButton = document.createElement("button");
                editButton.type = "button";
                editButton.className = "btn btn-primary edit-trigger";
                editButton.textContent = "Изменить";
                editButton.setAttribute("data-toggle", "modal");
                editButton.setAttribute("data-target", "#editModal");
                editButton.setAttribute("data-lesson-id", lesson.lessonID);
                editButton.addEventListener("click", function () {
                    var editModal = document.getElementById("editModal");
                    var modal = new bootstrap.Modal(editModal);
                    var teacherId = this.getAttribute("data-lesson-id");
                    var teacherIdInput = document.getElementById("lessonId");
                    teacherIdInput.value = teacherId;
                    modal.show();
                });

                actionsCell.appendChild(editButton);

                var deleteButton = document.createElement("button");
                deleteButton.type = "button";
                deleteButton.className = "btn btn-danger";
                deleteButton.textContent = "Удалить";
                deleteButton.setAttribute("data-id", lesson.lessonID);
                deleteButton.addEventListener("click", function () {
                    var teacherId = deleteButton.getAttribute("data-id");
                    deleteLesson(teacherId);
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


document.getElementById("addLessonFromModal").addEventListener("click", function () {
    var addForm = document.getElementById("addForm");


    var lesson = {
        lessonDate: addForm.elements["addLessonDate"].value.trim() || "",
        lessonTopic: addForm.elements["addLessonTopic"].value.trim() || "",
        teacherSelect: addForm.elements["addTeacherSelect"].value || ""
    };

    lesson.teacherID = parseInt(lesson.teacherSelect);

    var errors = validateInput(lesson);

    if (errors.length > 0) {

    } else {


        var lessonDateInput = document.getElementById("addLessonDate");
        var lessonDateValue = lessonDateInput.value;

        var lessonTopic = document.getElementById("addLessonTopic").value.trim();

        var teacherSelect = document.getElementById("addTeacherSelect");
        var selectedTeacherValue = teacherSelect.value;


        var formData = new FormData();
        formData.append("date", lessonDateValue);
        formData.append("topic", lessonTopic);
        formData.append("teach", selectedTeacherValue);



        fetch('/Lessons/AddLesson', {
            method: 'POST',
            body: formData
        })
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


function validateInput(lesson) {
    var errors = [];

    // Validate lessonDate
    var currentDate = new Date();
    var selectedDate = new Date(lesson.lessonDate);
    var isValidDate = selectedDate instanceof Date && !isNaN(selectedDate);
    if (!isValidDate || selectedDate.getFullYear() < 2022 || selectedDate.getFullYear() > 2023) {
        errors.push("Некорректная дата");
        var lessonDateError = document.getElementById("addLessonDateError");
        lessonDateError.textContent = "Некорректная дата";
    } else {
        var lessonDateError = document.getElementById("addLessonDateError");
        lessonDateError.textContent = "";
    }

    // Validate lessonTopic
    if (lesson.lessonTopic.length === 0 || lesson.lessonTopic.length > 50) {
        errors.push("Некорректная тема");
        var lessonTopicError = document.getElementById("addLessonTopicError");
        lessonTopicError.textContent = "Некорректная тема";
    } else {
        var lessonTopicError = document.getElementById("addLessonTopicError");
        lessonTopicError.textContent = "";
    }

    // Validate teacherSelect
    if (lesson.teacherSelect === "0" || lesson.teacherSelect === "" ) {
        errors.push("Выберите преподавателя");
        var teacherSelectError = document.getElementById("addTeacherSelectError");
        teacherSelectError.textContent = "Выберите преподавателя";
    } else {
        var teacherSelectError = document.getElementById("addTeacherSelectError");
        teacherSelectError.textContent = "";
    }

    return errors;
}
 
function deleteLesson(lessonId) {
    // Выполните POST-запрос на сервер, передавая идентификатор учителя
    fetch(`/Lessons/DeleteLesson?lessonId=${lessonId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                // Если запрос успешен, удалите соответствующую строку из таблицы
                var rowToDelete = document.querySelector(`tr[data-id="${lessonId}"]`);
                rowToDelete.parentNode.removeChild(rowToDelete);
            }
        })
        .catch(error => {
            console.error('Ошибка при удалении занятия:', error);
        });
}



$('#addModal').on('hidden.bs.modal', function () {
    // Очистка полей ввода
    $('#addLessonDate').val('');
    $('#addLessonTopic').val('');
    $('#addTeacherSelect').val('');

    // Очистка сообщений об ошибках
    $('#addLessonDateError').text('');
    $('#addLessonTopicError').text('');
    $('#addTeacherSelectError').text('');
});

$('#editModal').on('hidden.bs.modal', function () {
    // Очистка полей ввода
    $('#editLessonDate').val('');
    $('#editLessonTopic').val('');
    $('#editTeacherSelect').val('');

    // Очистка сообщений об ошибках
    $('#editLessonDateError').text('');
    $('#editLessonTopicError').text('');
    $('#editTeacherSelectError').text('');
    $('body').removeClass('modal-open'); // Удаление класса 'modal-open' у <body>
    $('.modal-backdrop').remove();
});

$('#editModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var lessonId = button.data('lesson-id');
    var modal = $(this);

    // Получение значений из выбранной строки таблицы
    var lessonDate = button.closest('tr').find('td:nth-child(1)').text();
    var lessonTopic = button.closest('tr').find('td:nth-child(2)').text();
    var teacherFullName = button.closest('tr').find('td:nth-child(3)').text();

    // Заполнение полей модального окна
    modal.find('#lessonId').val(lessonId);
    modal.find('#editLessonTopic').val(lessonTopic);

    // Установка значения в поле <input type="date">
    var dateParts = lessonDate.split('.'); // Разделение строки на части по точке
    var day = dateParts[0];
    var month = dateParts[1];
    var year = dateParts[2];
    var formattedDate = year + '-' + month + '-' + day;
    var dateObject = new Date(formattedDate);

    modal.find('#editLessonDate').val(formattedDate);

    // Выбор значения в поле <select>
    var selectElement = modal.find('#editTeacherSelect');

    // Итерация по <option> и сравнение значения для выбора
    selectElement.find('option').each(function () {
        if ($(this).text() === teacherFullName) {
            $(this).prop('selected', true);
            return false; // Прерывание итерации
        }
    });

    // Обновление стиля выбранного значения
    selectElement.trigger('change');
});


function validateInputEdit(lesson) {
    var errors = [];

    // Validate lessonDate
    var currentDate = new Date();
    var selectedDate = new Date(lesson.lessonDate);
    var isValidDate = selectedDate instanceof Date && !isNaN(selectedDate);
    if (!isValidDate || selectedDate.getFullYear() < 2022 || selectedDate.getFullYear() > 2023) {
        errors.push("Некорректная дата");
        var lessonDateError = document.getElementById("editLessonDateError");
        lessonDateError.textContent = "Некорректная дата";
    } else {
        var lessonDateError = document.getElementById("editLessonDateError");
        lessonDateError.textContent = "";
    }

    // Validate lessonTopic
    if (lesson.lessonTopic.length === 0 || lesson.lessonTopic.length > 50) {
        errors.push("Некорректная тема");
        var lessonTopicError = document.getElementById("editLessonTopicError");
        lessonTopicError.textContent = "Некорректная тема";
    } else {
        var lessonTopicError = document.getElementById("editLessonTopicError");
        lessonTopicError.textContent = "";
    }

    // Validate teacherSelect
    if (lesson.teacherSelect === "0" || lesson.teacherSelect === "") {
        errors.push("Выберите преподавателя");
        var teacherSelectError = document.getElementById("editTeacherSelectError");
        teacherSelectError.textContent = "Выберите преподавателя";
    } else {
        var teacherSelectError = document.getElementById("editTeacherSelectError");
        teacherSelectError.textContent = "";
    }
    return errors;
}

$('#saveChangesBtn').on('click', function () {
    var lessonId = document.getElementById("lessonId").value;
    var lessonDate = document.getElementById("editLessonDate").value;
    var lessonTopic = document.getElementById("editLessonTopic").value;
    var teacherId = document.getElementById("editTeacherSelect").value;


    var lesson = {
        lessonDate: editForm.elements["editLessonDate"].value.trim() || "",
        lessonTopic: editForm.elements["editLessonTopic"].value.trim() || "",
        teacherSelect: editForm.elements["editTeacherSelect"].value || ""
    };


    if (!validateInputEdit(lesson)) {
        return; // Если валидация не прошла, прерываем дальнейшее выполнение
    }

    var formData = new FormData();
    formData.append("LessId", lessonId);
    formData.append("date", lessonDate);
    formData.append("topic", lessonTopic);
    formData.append("teach", teacherId);

    fetch('/Lessons/UpdateLesson', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                // Обновить данные в таблице
                
                    loadInitialData();
                $('#editModal').modal('hide'); // Закрываем модальное окно

            } else {
                throw new Error('Ошибка при выполнении запроса');
            }
        })
        .catch(error => {
            console.log(error);
        });
});


