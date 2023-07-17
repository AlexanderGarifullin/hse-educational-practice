using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyWeb.Models;

namespace MyWeb.Controllers
{
    public class OlympiadsController : Controller
    {
        private readonly AppDBContent _context;


        public OlympiadsController(AppDBContent context)
        {
            _context = context;

        }
        public IActionResult Index()
        {
            ViewBag.UserName = HttpContext.Session.GetString("UserName");
            ViewBag.Students = _context.Students.ToList();
            return View(_context.Olympiads.ToList());
        }

        [HttpPost]
        public IActionResult FilterOlympiads(string name, string typeFilterValue, int year, int bp, int bpPerProblem)
        {
            var olympiads = _context.Olympiads.ToList();

            olympiads = olympiads.Where(o =>
            (o.OlympiadName == name || string.IsNullOrEmpty(name)) &&
            (o.ParticipationType == typeFilterValue || string.IsNullOrEmpty(typeFilterValue)) &&
            (o.Year == year ||  year == 0) && (o.BaseWeight == bp || bp == 0) &&
            (o.WeightPerProblem == bpPerProblem || bpPerProblem == 0)
            ).ToList();

            return Json(olympiads);
        }

        [HttpGet]
        public IActionResult GetAllOlympiads()
        {
            var students = _context.Olympiads.ToList();
            return Json(students);
        }


        [HttpPost]
        public IActionResult AddOlympiad(string name, string type, int year, int bp, int weight)
        {
            if (_context.Olympiads.Any(t => t.OlympiadName == name))
            {
                ModelState.AddModelError("CodeforcesTaskID", "Такая олимпиада уже есть");

                return Conflict("Такая задача уже есть");
            }

            OlympiadModel olymp = new OlympiadModel
            {
                OlympiadName = name,
                ParticipationType = type,
                Year = year,
                BaseWeight= bp,
                WeightPerProblem = weight
            };

            _context.Olympiads.Add(olymp);
            _context.SaveChanges();

            return Ok();
        }


        [HttpDelete]
        public IActionResult DeleteOlympiad(int olympiadId)
        {
            var olymp = _context.Olympiads.FirstOrDefault(p => p.OlympiadID == olympiadId);
            if (olymp != null)
            {
                _context.Olympiads.Remove(olymp);
                _context.SaveChanges();
                return Ok(); // Возвращает успешный статус код
            }
            else
            {
                return NotFound(); // Возвращает код 404 Not Found, если объект не найден
            }

        }

        [HttpPost]
        public IActionResult UpdateOlympiad(int olympiadId, string name, string type, int year, int bp, int weight)
        {
            if (_context.Olympiads.Any(t => t.OlympiadName == name && t.OlympiadID != olympiadId))
            {
                ModelState.AddModelError("CodeforcesTaskID", "Такая задача уже есть");

                return Conflict("Такая задача уже есть");
            }

            var existingTask = _context.Olympiads.FirstOrDefault(s => s.OlympiadID == olympiadId);

            if (existingTask != null)
            {
                existingTask.OlympiadName = name ?? string.Empty;
                existingTask.ParticipationType = type ?? string.Empty;
                existingTask.Year = year;
                existingTask.BaseWeight = bp;
                existingTask.WeightPerProblem = weight;
                _context.SaveChanges();
            }

            return Ok();
        }


        [HttpGet]
        public IActionResult getStudentForOlympiad(int olympiadId)
        {
            var participantOlympiads = _context.ParticipantOlympiads
        .Where(p => p.OlympiadID == olympiadId)
        .Include(p => p.OlympiadModel)
          .Include(p => p.ParticipantModel)
        .Include(p => p.ParticipantModel.StudentModel)
        .ToList();


            return Json(participantOlympiads);
        }


        [HttpPost]
        public IActionResult AddStudent(int olympiadId, int studentId)
        {
            var participant = _context.Participants.FirstOrDefault(p => p.StudentID == studentId && (p.TeamID > 0));
            int partId = 0;

            if (participant == null)
            {
                // Создание новой модели ParticipantModel
                var newParticipant = new ParticipantModel
                {
                    StudentID = studentId
        
                    // Установите TeamID в null или оставьте его по умолчанию, если он не требуется
                };

                // Добавление новой модели в контекст базы данных
                _context.Participants.Add(newParticipant);

                // Сохранение изменений в базе данных
                _context.SaveChanges();

                // Возврат ParticipantID новой модели
                partId =  newParticipant.ParticipantID;
            }
            else
            {
                partId =  participant.ParticipantID;
            }



            var participantOlympiadModel = new ParticipantOlympiadModel
            {
                OlympiadID = olympiadId,
                ParticipantID = partId
            };

            _context.ParticipantOlympiads.Add(participantOlympiadModel);
            _context.SaveChanges();

            return Ok();
        }

        [HttpDelete]
        public IActionResult DeleteStudent(int participantOlympiadId)
        {
            var partOl = _context.ParticipantOlympiads.FirstOrDefault(p => p.ParticipantOlympiadID == participantOlympiadId);
            if (partOl != null)
            {
                _context.ParticipantOlympiads.Remove(partOl);
                _context.SaveChanges();
                return Ok(); // Возвращает успешный статус код
            }
            else
            {
                return NotFound(); // Возвращает код 404 Not Found, если объект не найден
            }

        }

        [HttpPost]
        public IActionResult UpdateValueInDatabase(int participantOlympiadID, int newValue)
        {
            var partOlymp = _context.ParticipantOlympiads.FirstOrDefault(p => p.ParticipantOlympiadID == participantOlympiadID);

            if (partOlymp != null)
            {
                partOlymp.SolvedProblemsCount = newValue;
                _context.SaveChanges();
                return Ok();
            }

            return NotFound();
        }

    }
}
