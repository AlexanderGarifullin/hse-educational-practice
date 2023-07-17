using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyWeb.Models;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace MyWeb.Controllers
{
    public class TasksController : Controller
    {
        private readonly AppDBContent _context;

        public TasksController(AppDBContent context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            ViewBag.UserName = HttpContext.Session.GetString("UserName");
            ViewBag.FirstDifficulties = _context.FirstDifficulties.ToList();
            ViewBag.SecindDifficulties = _context.SecondDifficulties.ToList();
            ViewBag.Themes = _context.Themes.ToList();


            var tasks = _context.Tasks.Include(t => t.FirstDifficulty).Include(t =>t.SecondDifficulty).ToList();

            return View(tasks);
        }

        [HttpPost]
        public IActionResult FilterTasks(string task, int firstDif, int secDifId)
        {
            var tasks = _context.Tasks.Include(t => t.FirstDifficulty).Include(t => t.SecondDifficulty).ToList();

            tasks = tasks.Where(t =>
                (t.CodeforcesTaskID == task || string.IsNullOrEmpty(task)) &&
                (t.FirstDifficultyID == firstDif || firstDif == 0) &&
                 (t.SecondDifficultyID == secDifId || secDifId == 0)
            ).ToList();

            return Json(tasks);
        }
        [HttpGet]
        public IActionResult GetAllTasks()
        {
            var tasks = _context.Tasks.Include(t => t.FirstDifficulty).Include(t => t.SecondDifficulty).ToList();
            return Json(tasks);
        }


        [HttpPost]
        public IActionResult AddTask(string cfId, int firstDifId, int secondDifId)
        {
            if (_context.Tasks.Any(t => t.CodeforcesTaskID == cfId))
            {
                ModelState.AddModelError("CodeforcesTaskID", "Такая задача уже есть");

                return Conflict("Такая задача уже есть");
            }

            TaskModel task = new TaskModel
            {
                CodeforcesTaskID = cfId,
                FirstDifficultyID = firstDifId,
                SecondDifficultyID = secondDifId
            };

            _context.Tasks.Add(task);
            _context.SaveChanges();

            return Ok();
        }


        [HttpPost]
        public IActionResult DeleteTask(int taskId)
        {
            var task = _context.Tasks.FirstOrDefault(t => t.TaskID == taskId);
            if (task != null)
            {
                _context.Tasks.Remove(task);
                _context.SaveChanges();

            }
            return Ok();
        }


        [HttpPost]
        public IActionResult UpdateTask(int taskId, string taskName, int firstDifValueId, int secondDifValueId)
        {
            if (_context.Tasks.Any(t => t.CodeforcesTaskID == taskName && t.TaskID != taskId))
            {
                ModelState.AddModelError("CodeforcesTaskID", "Такая задача уже есть");

                return Conflict("Такая задача уже есть");
            }

            var existingTask= _context.Tasks.FirstOrDefault(s => s.TaskID == taskId);

            if (existingTask != null)
            {
                existingTask.CodeforcesTaskID = taskName ?? string.Empty;
                existingTask.FirstDifficultyID = firstDifValueId;
                existingTask.SecondDifficultyID = secondDifValueId;
                _context.SaveChanges();
            }

            return Ok();
        }


        [HttpPost]
        public IActionResult AddTheme(int taskId, int themeId)
        {
            var taskTheme = new TaskThemeModel
            {
                TaskID = taskId,
                ThemeID = themeId
            };

            _context.TaskThemes.Add(taskTheme);
            _context.SaveChanges();

            return Ok();
        }

        [HttpGet]
        public IActionResult getThemesForTask(int taskId)
        {
            var taskThemes = _context.TaskThemes
        .Where(p => p.TaskID == taskId)
        .Include(p => p.ThemeModel) 
        .ToList();


            return Json(taskThemes);
        }

        [HttpDelete]
        public IActionResult DeleteTheme(int taskThemeID)
        {
            var taskTheme = _context.TaskThemes.FirstOrDefault(p => p.TaskThemeID == taskThemeID);
            if (taskTheme != null)
            {
                _context.TaskThemes.Remove(taskTheme);
                _context.SaveChanges();
                return Ok(); // Возвращает успешный статус код
            }
            else
            {
                return NotFound(); // Возвращает код 404 Not Found, если объект не найден
            }

        }
    }
}
