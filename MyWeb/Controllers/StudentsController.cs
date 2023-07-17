using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyWeb.Models;


namespace MyWeb.Controllers
{
    public class StudentsController : Controller
    {
        private readonly AppDBContent _context;

        public StudentsController(AppDBContent context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            ViewBag.UserName = HttpContext.Session.GetString("UserName");
            ViewBag.Groups = _context.StudyGroups.ToList();
            ViewBag.Teams = _context.Teams.ToList();


            var students = _context.Students.Include(s => s.Group).ToList();

            return View(students);
        }

        [HttpPost]
        public IActionResult FilterStudents(string student , string nick, int groupId) 
        {
            var students = _context.Students.Include(s => s.Group).ToList();

            students = students.Where(s =>
                (s.GroupID == groupId || groupId == 0) &&
                (s.CodeforcesNickname == nick || string.IsNullOrEmpty(nick)) &&
                (string.Concat(s.LastName, " ", s.FirstName, " ", s.MiddleName) == student || string.IsNullOrEmpty(student))
            ).ToList();

            return Json(students);
        }

        [HttpGet]
        public IActionResult GetAllStudents()
        {
            var students = _context.Students.Include(s => s.Group).ToList();
            return Json(students);
        }

        [HttpGet]
        public IActionResult getTeamsForStudent(int studentId)
        {
            var participants = _context.Participants
        .Where(p => p.StudentID == studentId)
        .Include(p => p.TeamModel) // Include StudentModel entity
        .ToList();


            return Json(participants);
        }


        [HttpDelete]
        public IActionResult DeleteTeam(int participantId)
        {
            var participant = _context.Participants.FirstOrDefault(p => p.ParticipantID == participantId);
            if (participant != null)
            {
                _context.Participants.Remove(participant);
                _context.SaveChanges();
                return Ok(); // Возвращает успешный статус код
            }
            else
            {
                return NotFound(); // Возвращает код 404 Not Found, если объект не найден
            }

        }

        [HttpPost]
        public IActionResult AddTeam(int studentId, int teamId)
        {
            var participant = new ParticipantModel
            {
                StudentID = studentId,
                TeamID = teamId
            };

            _context.Participants.Add(participant);
            _context.SaveChanges();

            return Ok();
        }


        [HttpPost]
        public IActionResult AddStudent(string firstName, string middleName, string lastName, string nick, int groupId)
        {
            if (_context.Students.Any(s=>s.CodeforcesNickname == nick))
            {
                ModelState.AddModelError("CodeforcesNickname", "Такой ник уже занят");
              
                return Conflict("Такой ник уже занят");
            }

            StudentModel student = new StudentModel
            {
                FirstName = firstName,
                MiddleName = middleName,
                LastName = lastName,
                CodeforcesNickname = nick,
                GroupID = groupId
            };

            _context.Students.Add(student);
            _context.SaveChanges();

            return Ok();
        }


        [HttpPost]
        public IActionResult UpdateStudent(int stundetId, string firstName, string middleName, string lastName, string nick, int groupId)
        {
            if (_context.Students.Any(s => s.CodeforcesNickname == nick && s.StudentID != stundetId))
            {
                ModelState.AddModelError("CodeforcesNickname", "Такой ник уже занят");

                return Conflict("Такой ник уже занят");
            }


            var existingStudent = _context.Students.FirstOrDefault(s => s.StudentID == stundetId);

            if (existingStudent != null)
            {
                existingStudent.LastName = lastName ?? string.Empty;
                existingStudent.FirstName = firstName ?? string.Empty;
                existingStudent.MiddleName = middleName ?? string.Empty;
                existingStudent.CodeforcesNickname = nick ?? string.Empty;
                existingStudent.GroupID = groupId;
                _context.SaveChanges();
            }


            return Ok();
        }


        [HttpPost]
        public IActionResult DeleteStudent(int studentId)
        {
            var student = _context.Students.FirstOrDefault(s=> s.StudentID == studentId);
            if (student != null)
            {
                _context.Students.Remove(student);
                _context.SaveChanges();

            }
            return Ok();
        }



    }
}
