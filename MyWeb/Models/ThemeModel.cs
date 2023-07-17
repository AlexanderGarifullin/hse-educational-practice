using System.ComponentModel.DataAnnotations;

namespace MyWeb.Models
{
    public class ThemeModel
    {
        private int _id;
        private string _name;

        [Key]
        public int ThemeID
        {
            get { return _id; }
            set { _id = value; }
        }

        public string ThemeName
        {
            get { return _name; }
            set { _name = value; }
        }
    }
}
