using System.ComponentModel.DataAnnotations;

namespace MyWeb.Models
{
    public class TaskModel
    {
        private int id;
        private string codeforcesTaskId;
        private int firstDifId;
        private int secDifId;
        private FirstDifficultyModel firstDifficultyModel;
        private SecondDifficultyModel secondDifficultyModel;

        [Key]
        public int TaskID
        {
            get { return id; }
            set { id = value; }
        }

        public string CodeforcesTaskID
        {
            get { return codeforcesTaskId; }
            set { codeforcesTaskId = value; }
        }
        public int FirstDifficultyID
        {
            get { return firstDifId; }
            set { firstDifId = value; }
        }
        public int SecondDifficultyID
        {
            get { return secDifId; }
            set
            {
                secDifId = value;
            }   
        }

        public FirstDifficultyModel FirstDifficulty
        {
            get { return firstDifficultyModel; }
            set
            {
                firstDifficultyModel = value;
            }
        }

        public SecondDifficultyModel SecondDifficulty
        {
            get { return secondDifficultyModel; }
            set { secondDifficultyModel = value; }
        }

    }
}
