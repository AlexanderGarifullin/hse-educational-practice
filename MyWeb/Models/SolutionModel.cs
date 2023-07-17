using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyWeb.Models
{
    public class SolutionModel
    {
        private int id;
        private int taskContestId;
        private int participantId;
        private string status;
        private TaskContestModel taskContest;
        private ParticipantModel participant;

        [Key]
        public int SolutionID
        {
            get { return id; }
            set { id = value; }
        }
        [ForeignKey("TaskContestModel")]
        public int TaskContestID
        {
            get { return taskContestId; }
            set { taskContestId = value; }
        }
        [ForeignKey("ParticipantModel")]
        public int ParticipantID
        {
            get { return participantId; }
            set { participantId = value; }
        }


        public string SolutionStatus
        {
            get { return status; }
            set
            {
                status = value;
            }
        }
        public TaskContestModel TaskContestModel
        {
            get { return taskContest; }
            set
            {
                taskContest = value;
            }
        }

        public ParticipantModel ParticipantModel
        {
            get { return participant; }
            set
            {
                participant = value;
            }
        }



    }
}
