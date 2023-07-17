using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyWeb.Models
{
    public class ParticipantOlympiadModel
    {

        private int id;
        private int partId;
        private int olympId;
        private int cntSolved;
        private OlympiadModel olympiadModel;
        private ParticipantModel participant;

        [Key]
        public int ParticipantOlympiadID
        {
            get { return id; }
            set { id = value; }
        }

        [ForeignKey("ParticipantModel")]
        public int ParticipantID
        {
            get { return partId; }
            set { partId = value; }
        }

        [ForeignKey("OlympiadModel")]
        public int OlympiadID
        {
            get { return olympId; }
            set { olympId = value; }
        }
        public int SolvedProblemsCount
        {
            get { return cntSolved; }
            set { cntSolved = value; }
        }

        public OlympiadModel OlympiadModel
        {
            get { return olympiadModel; }
            set { olympiadModel = value; }
        }

        public ParticipantModel ParticipantModel
        {
            get { return participant; }
            set { participant = value; }
        }

    }
}
