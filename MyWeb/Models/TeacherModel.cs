using System.ComponentModel.DataAnnotations;

namespace MyWeb.Models
{
    public class TeacherModel
    {
        private int _id;
        private string _lastName;
        private string _firstName;
        private string _middleName;
        private string _cfNickname;
        private string _position;

        [Key]
        public int TeacherID
        {
            get { return _id; } 
            set { _id = value; }
        }

        public string LastName
        {
            get { return _lastName; }
            set { _lastName = value; }
        }

        public string FirstName
        {
            get { return _firstName; }
            set
            {
                _firstName = value;
            }
        }

        public string MiddleName
        {
            get { return _middleName; }
            set
            {
                _middleName = value;
            }
        }

        public string CodeforcesNickname
        {
            get { return _cfNickname; }
            set
            {
                _cfNickname = value;
            }
        }

        public string Position
        {
            get { return _position; }
            set
            {
                _position = value;
            }
        }
    }
}
