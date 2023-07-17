using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyWeb.Models
{
    public class TaskContestModel
    {
        private int id;
        private int taskId;
        private int contestId;
        private TaskModel task;
        private ContestModel contest;

        [Key]
        public int TaskContestID
        {
            get { return id; }
            set { id = value; }
        }

        [ForeignKey("TaskModel")]
        public int TaskID
        {
            get { return taskId; }
            set { taskId = value; }
        }

        [ForeignKey("ContestModel")]
        public int ContestID
        {
            get { return contestId; }
            set { contestId = value; }  
        }

        public TaskModel TaskModel
        {
            get { return task; }
            set { task = value; }
        }

        public ContestModel ContestModel
        {
            get { return contest; }
            set
            {
                contest = value;
            }
        }
   
    }
}
