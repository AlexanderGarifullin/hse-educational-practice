using System.ComponentModel.DataAnnotations;

namespace MyWeb.Models
{
    public class StudyGroupModel
    {
        private int id;
        private string name;

        [Key]
        public int GroupID
        {
            get { return id; }
            set { id = value; }
        }
        public string GroupName
        {
            get { return name; }
            set { name = value; }
        }
    }
}
