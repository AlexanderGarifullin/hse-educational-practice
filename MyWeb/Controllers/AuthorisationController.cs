using Microsoft.AspNetCore.Mvc;
using MyWeb.Models;

namespace MyWeb.Controllers
{
    public class AuthorisationController : Controller
    {


        private readonly AppDBContent _dbContext;

        public AuthorisationController(AppDBContent dbContext)
        {
            _dbContext = dbContext;
        }

        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Check(UserModel model)
        {
            
            if (string.IsNullOrEmpty(model.Username))
            {
                ViewBag.ErrorMessage = "Введите логин.";
                ViewBag.ErrorDisplay = "block";
                ViewBag.UserName = model.Username;
                ViewBag.Password = model.Password;

                return View("Index");
            }

            if (string.IsNullOrEmpty(model.Password))
            {
                ViewBag.ErrorMessage = "Введите пароль.";
                ViewBag.ErrorDisplay = "block";
                ViewBag.UserName = model.Username;
                ViewBag.Password = model.Password;

                return View("Index");
            }

            model.Username = model.Username.Trim();

            // Дополнительная проверка учетных данных пользователя

            var user = _dbContext.Users.FirstOrDefault(u => u.Username == model.Username && u.Password == model.Password);

            if (user != null)
            {
                HttpContext.Session.SetString("UserName", user.Username);
             // Успешный вход
                return RedirectToAction("Index", "Home"); // Перенаправление после успешного входа
            }
            else
            {
                ViewBag.ErrorMessage = "Неверный идентификатор пользователя или пароль. Введите верный идентификатор пользователя и пароль и повторите попытку.";
                ViewBag.ErrorDisplay = "block";
                ViewBag.UserName = model.Username;
                ViewBag.Password = model.Password;
                return View("Index");
            }
        }


    }
}
