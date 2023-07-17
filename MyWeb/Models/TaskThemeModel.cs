using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyWeb.Models
{
    public class TaskThemeModel
    {
        private int id;
        private int taskId;
        private int themeId;
        private TaskModel taskmodel;
        private ThemeModel theme;

        [Key]
        public int TaskThemeID
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
        [ForeignKey("ThemeModel")]
        public int ThemeID
        {
            get { return themeId; }
            set { themeId = value; }
        }

        public TaskModel TaskModel
        {
            get { return taskmodel; }
            set { taskmodel = value; }
        }

        public ThemeModel ThemeModel
        {
            get { return theme; }
            set { theme = value; }
        }

    }
}
