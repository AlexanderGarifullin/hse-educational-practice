using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.ComponentModel.DataAnnotations;

namespace MyWeb.Models
{
    public class ContestModel
    {
        private int _id;
        private string _name;
        private string _participantType;
        private int _duration;

        [Key]
        public int ContestId
        {
            get { return _id; }
            set { _id = value; }
        }
        public int Duration
        {
            get { return _duration; }
            set { _duration = value; }
        }
        public string ContestName
        {
            get { return _name; }
            set { _name = value; }
        }
        public string ParticipationType
        {
            get { return _participantType; }
            set { _participantType = value; }
        }
    }
}
