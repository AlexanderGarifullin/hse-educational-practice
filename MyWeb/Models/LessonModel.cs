using System.ComponentModel.DataAnnotations;

namespace MyWeb.Models
{
    public class LessonModel
    {
        private int _id;
        private DateTime _date;
        private string _topic;
        private int _teacherid;

        public TeacherModel _teacher;

        [Key]
        public int LessonID
        {
            get { return _id; }
            set { _id = value; }
        }

        public DateTime LessonDate
        {
            get { return _date; }
            set { _date = value; }
        }

        public string LessonTopic
        { get { return _topic; } set { _topic = value; } }

        public int TeacherID
        {
            get { return _teacherid; }
            set { _teacherid = value; }
        }
        public TeacherModel Teacher { get; set; }
    }
}
