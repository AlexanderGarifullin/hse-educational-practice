using System.ComponentModel.DataAnnotations;

namespace MyWeb.Models
{
    public class TeamModel
    {
        private int id;
        private string name;

        [Key]
        public int TeamID
        {
            get { return id; }
            set { id = value; }
        }

        public string TeamName
        {
            get { return name; }
            set { name = value; }
        }

    }
}
