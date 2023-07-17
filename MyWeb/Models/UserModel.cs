using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;


namespace MyWeb.Models
{
    public class UserModel
    {
        private int userid = -1;
        private string role = "no role";
        private string username = "";
        private string password = "";

        [Key]
        public int UserId
        {
            get { return userid; }
            set { userid = value; }
        }

        [BindProperty]
        public string Username { get { return username; } set { username = value; } }

        [BindProperty]
        [DataType(DataType.Password)]
        public string Password { get { return password; } set { password = value; } }

        public string Role
        {
            get { return role; }
            set { role = value; }
        }

    }
}
