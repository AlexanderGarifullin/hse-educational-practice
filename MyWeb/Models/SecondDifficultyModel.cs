using System.ComponentModel.DataAnnotations;

namespace MyWeb.Models
{
    public class SecondDifficultyModel
    {
        private int _id;
        private int taskWeight;

        [Key]
        public int SecondDifficultyID
        {
            get { return _id; }
            set { _id = value; }
        }

        public int TaskWeight
        {
            get { return taskWeight; }
            set { taskWeight = value; }
        }
    }
}
