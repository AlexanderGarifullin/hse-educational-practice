using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyWeb.Models;

namespace MyWeb.Controllers
{
    public class TeamsController : Controller
    {
        private readonly AppDBContent _context;

        public TeamsController(AppDBContent context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            ViewBag.UserName = HttpContext.Session.GetString("UserName");
            ViewBag.Students = _context.Students.ToList();
            return View(_context.Teams.ToList());
        }

        [HttpPost]
        public IActionResult FilterTeams(string team)
        {
            var teams = _context.Teams.Where(t => t.TeamName == team).ToList();

            return Json(teams);
        }

        [HttpGet]
        public IActionResult GetAllTeams()
        {
            var teams = _context.Teams.ToList();
            return Json(teams);
        }


        [HttpPost]
        public IActionResult AddTeam(string teamName)
        {
            if (_context.Teams.Any(t=> t.TeamName == teamName))
            {
                ModelState.AddModelError("TeamName", "Такая команда уже есть");

                return Conflict("Такая команда уже есть");
            }

            TeamModel team = new TeamModel
            {
                TeamName = teamName
            };

            _context.Teams.Add(team);
            _context.SaveChanges();

            return Ok();
        }

        [HttpPost]
        public IActionResult DeleteTeam(int teamId)
        {
            var team = _context.Teams.FirstOrDefault(t => t.TeamID == teamId);
            if (team != null)
            {
                _context.Teams.Remove(team);
                _context.SaveChanges();

            }
            return Ok();
        }

        [HttpPost]
        public IActionResult UpdateTeam(int teamId, string teamName)
        {
            if (_context.Teams.Any(t => t.TeamName == teamName))
            {
                ModelState.AddModelError("TeamName", "Такая команда уже есть");

                return Conflict("Такая команда уже есть");
            }

            var existingTeam = _context.Teams.FirstOrDefault(t => t.TeamID == teamId);

            if (existingTeam != null)
            {
                existingTeam.TeamName = teamName ?? string.Empty;;
                _context.SaveChanges();
            }


            return Ok();
        }

        [HttpGet]
        public IActionResult getStudentsForTeam(int teamId)
        {
            var participants = _context.Participants
        .Where(p => p.TeamID == teamId)
        .Include(s => s.StudentModel) 
        .ToList();


            return Json(participants);
        }


        [HttpPost]
        public IActionResult AddStudent(int teamId, int studentId)
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

        [HttpDelete]
        public IActionResult DeleteStudent(int participantId)
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
    }
}
