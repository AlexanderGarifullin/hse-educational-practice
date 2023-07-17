using Microsoft.AspNetCore.Mvc;
using MyWeb.Models;
using System.Diagnostics;

namespace MyWeb.Controllers
{
    public class TeachersController : Controller
    {
        private readonly AppDBContent _context;

        public TeachersController(AppDBContent context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            ViewBag.UserName = HttpContext.Session.GetString("UserName");
            var teachers = _context.Teachers.ToList();
            return View(teachers);
        }

        [HttpPost]
        public IActionResult FilterTeachers(string lastName, string firstName, string middleName, string nickname, string position)
        {
            // Выполните фильтрацию данных на основе переданных значений
            var filteredTeachers = _context.Teachers
                .Where(t =>
                    (string.IsNullOrEmpty(lastName) || t.LastName == (lastName)) &&
                    (string.IsNullOrEmpty(firstName) || t.FirstName == (firstName)) &&
                    (string.IsNullOrEmpty(middleName) || t.MiddleName == (middleName)) &&
                    (string.IsNullOrEmpty(nickname) || t.CodeforcesNickname == (nickname)) &&
                    (string.IsNullOrEmpty(position) || t.Position == (position))
                )
                .ToList();

            var needJs = Json(filteredTeachers);
            return needJs;
        }

        [HttpGet]
        public IActionResult GetAllTeachers()
        {
            var teachers = _context.Teachers
              .ToList();
            return Json(teachers);

        }

        [HttpPost]
        public IActionResult AddTeacher([FromBody] TeacherModel teacher)
        {
            if (teacher != null)
            {
                if (teacher.LastName == null)
                {
                    teacher.LastName = "";
                }

                if (teacher.FirstName == null)
                {
                    teacher.FirstName = "";
                }

                if (teacher.MiddleName == null)
                {
                    teacher.MiddleName = "";
                }

                if (teacher.CodeforcesNickname == null)
                {
                    teacher.CodeforcesNickname = "";
                }

                if (teacher.Position == null)
                {
                    teacher.Position = "";
                }

                _context.Teachers.Add(teacher);
                _context.SaveChanges();
            }

            return Ok();
        }

        [HttpPost]
        public  IActionResult DeleteTeacher(int teacherId)
        {
            var teacher = _context.Teachers.FirstOrDefault(t => t.TeacherID == teacherId);
            if (teacher != null)
            {
                _context.Teachers.Remove(teacher);
                _context.SaveChanges();
                
            }
            return Ok();
        }

        [HttpPost]
        public IActionResult UpdateTeacher(int teacherID, string lastName, string firstName, string middleName, string cfNickname, string position)
        {
            var existingTeacher = _context.Teachers.FirstOrDefault(t => t.TeacherID == teacherID);

            if (existingTeacher != null)
            {
                existingTeacher.LastName = lastName ?? string.Empty;
                existingTeacher.FirstName = firstName ?? string.Empty;
                existingTeacher.MiddleName = middleName ?? string.Empty;
                existingTeacher.CodeforcesNickname = cfNickname ?? string.Empty;
                existingTeacher.Position = position ?? string.Empty;


                _context.SaveChanges();
            }
            return Ok();
        }
    }
}

