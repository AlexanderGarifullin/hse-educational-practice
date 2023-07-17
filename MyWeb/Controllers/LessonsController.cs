using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyWeb.Models;

namespace MyWeb.Controllers
{
    public class LessonsController : Controller
    {
        private readonly AppDBContent _context;


        public LessonsController(AppDBContent context)
        {
            _context = context;

        }
        public IActionResult Index()
        {

            ViewBag.UserName = HttpContext.Session.GetString("UserName");
            ViewBag.Teachers = _context.Teachers.ToList();

            return View(_context.Lessons.Include(l => l.Teacher).ToList());
        }

        [HttpPost]
        public IActionResult FilterLessons(DateTime date, string topic, int teach)
        {

            var lessons = _context.Lessons.Include(l => l.Teacher).ToList();
            // Фильтрация lessons в соответствии с условиями
            var filteredLessons = lessons.Where(lesson =>
                (date == DateTime.MinValue || lesson.LessonDate == date) &&
                (string.IsNullOrEmpty(topic) || lesson.LessonTopic == topic) &&
                (teach == 0 || lesson.TeacherID == teach)
            ).ToList();

            return Json(filteredLessons);
        }
        [HttpGet]
        public IActionResult GetAllLessons()
        {
            var lessons = _context.Lessons.Include(l => l.Teacher).ToList();
            return Json(lessons);
        }
        [HttpPost]
        public IActionResult AddLesson(DateTime date, string topic, int teach)
        {

            LessonModel lesson = new LessonModel
            {
                LessonDate = date,
                LessonTopic = topic,
                TeacherID = teach
            };

            _context.Lessons.Add(lesson);
            _context.SaveChanges();

            return Ok();
        }

        [HttpPost]
        public IActionResult DeleteLesson(int lessonId)
        {
            var lesson = _context.Lessons.FirstOrDefault(t => t.LessonID == lessonId);
            if (lesson != null)
            {
                _context.Lessons.Remove(lesson);
                _context.SaveChanges();

            }
            return Ok();
        }
        [HttpPost]
        public IActionResult UpdateLesson(int LessId, DateTime date, string topic, int teach)
        {
            // Находим урок в базе данных по его идентификатору
            var lesson = _context.Lessons.FirstOrDefault(l => l.LessonID == LessId);

            if (lesson != null)
            {
                // Обновляем значения урока
                lesson.LessonDate = date;
                lesson.LessonTopic = topic;
                lesson.TeacherID = teach;

                // Сохраняем изменения в базе данных
                _context.SaveChanges();
            }

            return Ok();
        }

    }
}
