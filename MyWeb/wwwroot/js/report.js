document.addEventListener("DOMContentLoaded", function () {
    var contestSelect = document.getElementById("contestSelect");
    var confirmButton = document.getElementById("confirmButton");
    var ratingButton = document.getElementById("ratingButton");
    var olympiadSelect = document.getElementById("olympiadSelect");
    var olympiadConfirmButton = document.getElementById("olympiadConfirmButton");
    var themeSelect = document.getElementById("themeSelect");
    var themeConfirmButton = document.getElementById("themeConfirmButton");
    var difficultySelect = document.getElementById("difficultySelect");
    var difficultyConfirmButton = document.getElementById("difficultyConfirmButton");


    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/Home/GetContests");
    xhr.onload = function () {
        if (xhr.status === 200) {
            var contests = JSON.parse(xhr.responseText);
            contests.forEach(function (contest) {
                var option = document.createElement("option");
                option.value = contest.contestId;
                option.text = contest.contestName;
                contestSelect.appendChild(option);
            });
        }
    };
    xhr.send();

    var olympiadXhr = new XMLHttpRequest();
    olympiadXhr.open("GET", "/Home/GetOlympiads");
    olympiadXhr.onload = function () {
        if (olympiadXhr.status === 200) {
            var olympiads = JSON.parse(olympiadXhr.responseText);
            olympiads.forEach(function (olympiad) {
                var option = document.createElement("option");
                option.value = olympiad.olympiadID; // Обратите внимание на правильное использование свойства
                option.text = olympiad.olympiadName;
                olympiadSelect.appendChild(option);
            });
        }
    };
    olympiadXhr.send();

    var themeXhr = new XMLHttpRequest();
    themeXhr.open("GET", "/Home/GetThemes");
    themeXhr.onload = function () {
        if (themeXhr.status === 200) {
            var themes = JSON.parse(themeXhr.responseText);
            themes.forEach(function (theme) {
                var option = document.createElement("option");
                option.value = theme.themeID;
                option.text = theme.themeName;
                themeSelect.appendChild(option);
            });
        }
    };
    themeXhr.send();

    var difficultyXhr = new XMLHttpRequest();
    difficultyXhr.open("GET", "/Home/GetDifficulties");
    difficultyXhr.onload = function () {
        if (difficultyXhr.status === 200) {
            var difficulties = JSON.parse(difficultyXhr.responseText);
            difficulties.forEach(function (difficulty) {
                var option = document.createElement("option");
                option.value = difficulty.firstDifficultyID;
                option.text = difficulty.coefficient; 
                difficultySelect.appendChild(option);
            });
        }
    };
    difficultyXhr.send();


    difficultyConfirmButton.addEventListener("click", function () {
        var selectedDifficultyId = difficultySelect.value;
        var selectedDifficultyName = difficultySelect.options[difficultySelect.selectedIndex].text;
        var url = "/Home/GenerateExcel?nameReport=" + encodeURIComponent(selectedDifficultyName) + "&reportId=4&firstDifId=" + selectedDifficultyId;
        window.location.href = url;
    });

    themeConfirmButton.addEventListener("click", function () {
        var selectedThemeId = themeSelect.value;
        var selectedThemeName = themeSelect.options[themeSelect.selectedIndex].text;
        var url = "/Home/GenerateExcel?nameReport=" + encodeURIComponent(selectedThemeName) + "&reportId=5&themeId=" + selectedThemeId;
        window.location.href = url;
    });

    olympiadConfirmButton.addEventListener("click", function () {
        var selectedOlympiadId = olympiadSelect.value;
        var selectedOlympiadName = olympiadSelect.options[olympiadSelect.selectedIndex].text; // Получаем выбранный текст олимпиады
        var url = "/Home/GenerateExcel?nameReport=" + encodeURIComponent(selectedOlympiadName) + "&reportId=3&olympiadId=" + selectedOlympiadId;
        window.location.href = url;  });

  
    confirmButton.addEventListener("click", function () {
        var selectedContestId = contestSelect.value;
        var selectedContestName = contestSelect.options[contestSelect.selectedIndex].text; // Получаем выбранный текст контеста
        var url = "/Home/GenerateExcel?nameReport=" + encodeURIComponent(selectedContestName) + "&reportId=2&contestId=" + selectedContestId;
        window.location.href = url;
    });


    ratingButton.addEventListener("click", function () {
        window.location.href = "/Home/GenerateExcel?nameReport=Rating&reportId=1";
    });
});
