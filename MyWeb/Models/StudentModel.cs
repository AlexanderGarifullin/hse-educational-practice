using System.ComponentModel.DataAnnotations;

namespace MyWeb.Models
{
    public class StudentModel
    {
        private int id;
        private string _lastName;
        private string _firstName;
        private string _middleName;
        private string _cfNickname;
        private int groupId;
        private StudyGroupModel studyGroup;

        [Key]
        public int StudentID
        {
            get { return id; }
            set { id = value; }
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

        public int GroupID
        {
            get { return groupId; }
            set { groupId = value; }
        }
        public StudyGroupModel Group
        {
            get { return studyGroup; }
            set { studyGroup = value; }
        }
    }
}
