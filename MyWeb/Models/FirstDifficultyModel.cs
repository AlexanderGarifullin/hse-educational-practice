
using System.ComponentModel.DataAnnotations;

namespace MyWeb.Models
{
    public class FirstDifficultyModel
    {
        private int _id;
        private double _coefficient;

        [Key]
        public int FirstDifficultyID
        {
            get { return _id; }
            set { _id = value; }
        }
        
        public double Coefficient
        {
            get { return _coefficient; }
            set { _coefficient = value; }
        }

    }
}
