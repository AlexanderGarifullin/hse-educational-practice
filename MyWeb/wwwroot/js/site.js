

function logout() {
    window.location.href = '/Authorisation/Index';
}

function goReports(source) {
    switch (source) {
        case "teachers":
            window.location.href = '/Teachers/Index?source=teachers';
            break;
        case "lessons":
            window.location.href = '/Lessons/Index?source=lessons';
            break;
        case "students":
            window.location.href = '/Students/Index?source=students';
            break;
        case "teams":
            window.location.href = '/Teams/Index?source=teams';
            break;
        case "olympiads":
            console.log('tt',1);
            window.location.href = '/Olympiads/Index?source=olympiads';
            break;
        case "contest":
            window.location.href = '/Contest/Index?source=contest';
            break;
        case "tasks":
            window.location.href = '/Tasks/Index?source=tasks';
            break;
        default:
            window.location.href = '/Home/Index?source=home';
            break;
    }
}

function changeColorBasedOnSource() {
    var currentURL = window.location.href;
    var urlObject = new URL(currentURL);
    var searchParams = new URLSearchParams(urlObject.search);
    var source = searchParams.get('source');

    if (source) {
        source = source.toLowerCase(); // Приведение к нижнему регистру
        var element = document.getElementById(source);
        if (element) {
            element.style.color = 'aliceblue';
        }
    }
    else {
        var element2 = document.getElementById('home');
        if (element2) {
            element2.style.color = 'aliceblue';
        }
    }
}

document.addEventListener("DOMContentLoaded", changeColorBasedOnSource);

