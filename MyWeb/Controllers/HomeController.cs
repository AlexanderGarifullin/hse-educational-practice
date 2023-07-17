using Microsoft.AspNetCore.Mvc;
using MyWeb.Models;
using System.Diagnostics;
using OfficeOpenXml;
using Microsoft.EntityFrameworkCore;
using System.Runtime.InteropServices;

namespace MyWeb.Controllers
{
    public class HomeController : Controller
    {
        private readonly AppDBContent _context;
        private readonly ILogger<HomeController> _logger;

        public HomeController(AppDBContent context, ILogger<HomeController> logger)
        {
            _context = context;
            _logger = logger;
        }

        public IActionResult Index()
        {
            ViewBag.UserName = HttpContext.Session.GetString("UserName");
            return View();
        }

        [HttpGet]
        public IActionResult GetContests()
        {
            var contests = _context.Contests.ToList(); 
            return Json(contests);
        }
        [HttpGet]
        public IActionResult GetOlympiads()
        {
            var olympiads = _context.Olympiads.ToList();
            return Json(olympiads);
        }
        [HttpGet]
        public IActionResult GetThemes()
        {
            var themes = _context.Themes.ToList();
            return Json(themes);
        }

        [HttpGet]
        public IActionResult GetDifficulties()
        {
            var firstDifficulties = _context.FirstDifficulties.ToList();

            var simplifiedDifficulties = firstDifficulties.Select(d => new
            {
                firstDifficultyID = d.FirstDifficultyID,
                coefficient = Math.Round(d.Coefficient, 1) 
            });

            return Json(simplifiedDifficulties);
        }



        [HttpGet]
        public IActionResult GenerateExcel(string nameReport, int reportId, int contestId = -1, int olympiadId = -1, int themeId = -1, int firstDifId = -1)
        {
            string sqlQuery="error";
            bool needId = true;
            int curId = -1;
            switch (reportId)
            {
                // Рейтиннг.
                case 1:
                    needId = false;
                    sqlQuery = @"SELECT
  s.LastName as 'Фамилия',
  s.FirstName as 'Имя',
  s.MiddleName as 'Отчество',
  s.CodeforcesNickname as 'Ник на Codeforces',
  g.GroupName as 'Группа',
  ROUND(COALESCE(SUM(rp.RP), 0), 2) AS RP,
  ROUND(COALESCE(SUM(op.BP), 0), 2) AS BP,
  ROUND(COALESCE(SUM(rp.RP), 0) + COALESCE(SUM(op.BP), 0), 2) AS Total
FROM
  Students s
  INNER JOIN Participants p ON s.StudentID = p.StudentID
  INNER JOIN StudyGroups g ON s.GroupID = g.GroupID
  LEFT JOIN (
    SELECT
      sol.ParticipantID,
      SUM(CASE
        WHEN sol.SolutionStatus = 'Решена' THEN t.SecondDifficultyID
        WHEN sol.SolutionStatus = 'Дорешена' THEN t.SecondDifficultyID * f.Coefficient
        ELSE 0
      END) AS RP
    FROM
      Solutions sol
      INNER JOIN TaskContests tc ON sol.TaskContestID = tc.TaskContestID
      INNER JOIN Tasks t ON tc.TaskID = t.TaskID
      INNER JOIN FirstDifficulties f ON t.FirstDifficultyID = f.FirstDifficultyID
    GROUP BY
      sol.ParticipantID
  ) AS rp ON p.ParticipantID = rp.ParticipantID
  LEFT JOIN (
    SELECT
      po.ParticipantID,
      SUM(o.BaseWeight + o.WeightPerProblem * po.SolvedProblemsCount) AS BP
    FROM
      ParticipantOlympiads po
      INNER JOIN Olympiads o ON po.OlympiadID = o.OlympiadID
    GROUP BY
      po.ParticipantID
  ) AS op ON p.ParticipantID = op.ParticipantID
GROUP BY
  s.LastName,
  s.FirstName,
  s.MiddleName,
  s.CodeforcesNickname,
  g.GroupName
ORDER BY
  Total DESC,
  RP DESC,
  BP DESC,
  s.LastName ASC,
  s.FirstName ASC,
  s.MiddleName ASC,
  s.CodeforcesNickname ASC,
  g.GroupName ASC;
";
                    break;
                // Контест.
                case 2:
                    curId = contestId;
                    sqlQuery = @"SELECT 
    LastName, 
    FirstName, 
    MiddleName, 
    GroupName, 
    CodeforcesNickname, 
    SUM(CASE 
        WHEN SolutionStatus = 'Решена' THEN TaskWeight
        WHEN SolutionStatus = 'Дорешена' THEN Coefficient * TaskWeight
        ELSE 0
    END) AS RP
FROM (
    SELECT 
        Students.LastName, 
        Students.FirstName, 
        Students.MiddleName, 
        StudyGroups.GroupName, 
        Students.CodeforcesNickname,
        Solutions.SolutionStatus, 
        FirstDifficulties.Coefficient, 
        SecondDifficulties.TaskWeight,
        TaskContests.ContestID
    FROM Solutions  
    LEFT JOIN Participants ON Solutions.ParticipantID = Participants.ParticipantID 
    LEFT JOIN Students ON Students.StudentID = Participants.StudentID
    LEFT JOIN StudyGroups ON StudyGroups.GroupID = Students.GroupID
    LEFT JOIN TaskContests ON TaskContests.TaskContestID = Solutions.TaskContestID
    LEFT JOIN Tasks ON Tasks.TaskID = TaskContests.TaskID
    LEFT JOIN FirstDifficulties ON Tasks.FirstDifficultyID = FirstDifficulties.FirstDifficultyID
    LEFT JOIN SecondDifficulties ON Tasks.SecondDifficultyID = SecondDifficulties.SecondDifficultyID
    WHERE TaskContests.ContestID = @curId
) AS subquery 
GROUP BY LastName, FirstName, MiddleName , GroupName, CodeforcesNickname
ORDER BY RP DESC, LastName ASC, FirstName ASC, MiddleName ASC, GroupName ASC, CodeforcesNickname ASC;
";
                    break;
                // Олимпиада.
                case 3:
                    curId = olympiadId;
                    sqlQuery = @"SELECT 
    LastName, FirstName, MiddleName, GroupName, CodeforcesNickname, 
    COALESCE(SUM(BaseWeight + WeightPerProblem * SolvedProblemsCount), 0) AS BP
FROM (
    SELECT 
        Students.LastName, Students.FirstName, Students.MiddleName, StudyGroups.GroupName, 
        Students.CodeforcesNickname, ParticipantOlympiads.SolvedProblemsCount, Olympiads.BaseWeight, 
        Olympiads.WeightPerProblem
    FROM ParticipantOlympiads  
    LEFT JOIN Participants ON ParticipantOlympiads.ParticipantID = Participants.ParticipantID 
    LEFT JOIN Students ON Students.StudentID = Participants.StudentID
    LEFT JOIN StudyGroups ON StudyGroups.GroupID = Students.GroupID
    LEFT JOIN Olympiads ON Olympiads.OlympiadID = ParticipantOlympiads.OlympiadID
    WHERE Olympiads.OlympiadID = @curId
) AS subquery 
GROUP BY LastName, FirstName, MiddleName, GroupName, CodeforcesNickname
ORDER BY BP DESC, LastName ASC, FirstName ASC, MiddleName ASC, GroupName ASC, CodeforcesNickname ASC
";
                    break;
                // Задачи по сложности.
                case 4:
                    curId = firstDifId;
                    sqlQuery = @"SELECT 
  t.CodeforcesTaskID,
  GROUP_CONCAT(DISTINCT TRIM(th.ThemeName) ORDER BY th.ThemeName SEPARATOR ', ') AS Themes,
  sd.TaskWeight
FROM 
  Tasks t
  LEFT JOIN FirstDifficulties fd ON fd.FirstDifficultyID = t.FirstDifficultyID
  LEFT JOIN SecondDifficulties sd ON sd.SecondDifficultyID = t.SecondDifficultyID
  LEFT JOIN TaskThemes tt ON tt.TaskID = t.TaskID
  LEFT JOIN Themes th ON th.ThemeID = tt.ThemeID
WHERE 
  fd.FirstDifficultyID = @curId
GROUP BY 
  t.CodeforcesTaskID, sd.TaskWeight
ORDER BY 
  sd.TaskWeight, t.CodeforcesTaskID, Themes;
";
                    break;
                // Задачи по теме.
                case 5:
                    curId = themeId;
                    sqlQuery = @"SELECT 
  Tasks.CodeforcesTaskID, 
  ROUND(FirstDifficulties.Coefficient, 1) AS Coefficient, 
  SecondDifficulties.TaskWeight 
FROM 
  TaskThemes 
  LEFT JOIN Tasks ON Tasks.TaskID = TaskThemes.TaskID 
  LEFT JOIN Themes ON Themes.ThemeID = TaskThemes.ThemeID 
  LEFT JOIN FirstDifficulties ON FirstDifficulties.FirstDifficultyID = Tasks.FirstDifficultyID 
  LEFT JOIN SecondDifficulties ON SecondDifficulties.SecondDifficultyID = Tasks.SecondDifficultyID 
WHERE 
  Themes.ThemeID = @curId 
ORDER BY 
  FirstDifficulties.Coefficient ASC, 
  Tasks.CodeforcesTaskID ASC; 
";
                    break;
            }
    
            var excelGenerator = new ExcelGenerator();

            var excelFile = excelGenerator.GenerateExcelFile(nameReport, sqlQuery, _context, needId, curId);

            var contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            var fileName = $"{nameReport}.xlsx";

          return File(excelFile, contentType, fileName);
        }



        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}