using System.ComponentModel.DataAnnotations;

namespace MyWeb.Models
{
    public class OlympiadModel
    {
        private int _id;
        private string _name;
        private string _participantType;
        private int _year;
        public double _baseWeight;
        public double _weightPerProblem;


        [Key]
        public int OlympiadID
        {
            get { return _id; }
            set { _id = value; }
        }

        public string OlympiadName
        {
            get { return _name; }
            set { _name = value; }
        }

        public string ParticipationType
        {
            get { return _participantType; }
            set { _participantType = value; }
        }
        public int Year
        {
            get { return _year; }
            set
            {
                _year = value;
            }
        }

        public double BaseWeight
        {
            get { return _baseWeight; }
            set { _baseWeight = value; }
        }

        public double WeightPerProblem
        {
            get { return _weightPerProblem; }
            set
            {
                _weightPerProblem = value;
            }
        }
    }
}
