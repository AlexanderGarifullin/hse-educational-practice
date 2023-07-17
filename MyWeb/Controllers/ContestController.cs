using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyWeb.Models;

namespace MyWeb.Controllers
{
    public class ContestController : Controller
    {
        private readonly AppDBContent _context;

        public ContestController(AppDBContent context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            ViewBag.UserName = HttpContext.Session.GetString("UserName");
            ViewBag.Tasks = _context.Tasks.ToList();
            ViewBag.Students = _context.Students.ToList();
            return View(_context.Contests.ToList());
        }


        [HttpPost]
        public IActionResult FilterContests(string name, string typeFilterValue, int duration)
        {
            var contests = _context.Contests.ToList();

            contests = contests.Where(o =>
            (o.ContestName == name || string.IsNullOrEmpty(name)) &&
            (o.ParticipationType == typeFilterValue || string.IsNullOrEmpty(typeFilterValue)) &&
            (o.Duration == duration || duration == 0)
            ).ToList();

            return Json(contests);
        }


        [HttpGet]
        public IActionResult GetAllContests()
        {
            var contest = _context.Contests.ToList();
            return Json(contest);
        }


        [HttpPost]
        public IActionResult AddContest(string name, string type, int duration)
        {
            if (_context.Contests.Any(t => t.ContestName == name))
            {
                ModelState.AddModelError("ContestName", "Такой контест уже есть");

                return Conflict("Такой контест уже есть");
            }

            ContestModel contest = new ContestModel
            {
                ContestName = name,
                ParticipationType = type,
                Duration = duration
            };

            _context.Contests.Add(contest);
            _context.SaveChanges();

            return Ok();
        }

        [HttpDelete]
        public IActionResult DeleteContest(int contestId)
        {
            var contest = _context.Contests.FirstOrDefault(p => p.ContestId == contestId);
            if (contest != null)
            {
                _context.Contests.Remove(contest);
                _context.SaveChanges();
                return Ok(); // Возвращает успешный статус код
            }
            else
            {
                return NotFound(); // Возвращает код 404 Not Found, если объект не найден
            }

        }

        [HttpPost]
        public IActionResult UpdateContest(int contestId, string name, string type, int duration)
        {
            if (_context.Contests.Any(t => t.ContestName == name && t.ContestId != contestId))
            {
                ModelState.AddModelError("ContestName", "Такой контест уже есть");

                return Conflict("Такая контест уже есть");
            }

            var existing = _context.Contests.FirstOrDefault(s => s.ContestId == contestId);

            if (existing != null)
            {
                existing.ContestName = name ?? string.Empty;
                existing.ParticipationType = type ?? string.Empty;
                existing.Duration = duration;
                _context.SaveChanges();
            }

            return Ok();
        }


        [HttpGet]
        public IActionResult getTasksForContest(int contestId)
        {
            var taskContest = _context.TaskContests
        .Where(p => p.ContestID == contestId)
          .Include(p => p.TaskModel)
        .ToList();


            return Json(taskContest);
        }



        [HttpPost]
        public IActionResult AddTask(int contestId, int taskId)
        {

            var taskContest = new TaskContestModel
            {
                TaskID = taskId,
                ContestID = contestId
            };

            _context.TaskContests.Add(taskContest);
            _context.SaveChanges();

            return Ok();
        }


        [HttpDelete]
        public IActionResult DeleteTask(int taskContestID)
        {
            var taskContest = _context.TaskContests.FirstOrDefault(p => p.TaskContestID == taskContestID);
            if (taskContest != null)
            {
                _context.TaskContests.Remove(taskContest);
                _context.SaveChanges();
                return Ok(); // Возвращает успешный статус код
            }
            else
            {
                return NotFound(); // Возвращает код 404 Not Found, если объект не найден
            }

        }

        [HttpGet]
        public IActionResult getStudentForContest(int contestId)
        {
            var participantModels = _context.Participants
     .Include(p => p.StudentModel)
     .Where(p => _context.Solutions
         .Any(s => s.ParticipantID == p.ParticipantID &&
                   _context.TaskContests
                       .Any(tc => tc.TaskContestID == s.TaskContestID &&
                                  tc.ContestID == contestId)))
     .ToList();

            return Json(participantModels);
        }

        [HttpGet]
        public IActionResult getStatus(int contestId)
        {
            var solutions = _context.Solutions.Include(p=>p.TaskContestModel).Where(p=>p.TaskContestModel.ContestID == contestId).
                ToList();
            return Json(solutions);
        }

    }
}
