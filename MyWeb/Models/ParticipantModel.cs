using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyWeb.Models
{
    public class ParticipantModel
    {
        private int id;
        private int studentid;
        private int teamid;
        private StudentModel studentModel;
        private TeamModel teamModel;

        [Key]
        public int ParticipantID
        {
            get { return id; }
            set { id = value; }
        }
        [ForeignKey("StudentModel")]
        public int StudentID
        {
            get { return studentid; }
            set { studentid = value; }
        }
        [ForeignKey("TeamModel")]
        public int TeamID
        {
            get { return teamid; }
            set { teamid = value; }
        }

        public StudentModel StudentModel
        {
            get { return studentModel; }
            set { studentModel = value; }
        }

        public TeamModel TeamModel
        {
            get { return teamModel; }
            set { teamModel = value; }
        }

    }
}
