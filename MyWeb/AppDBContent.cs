using Microsoft.EntityFrameworkCore;
using MyWeb.Models;

namespace MyWeb
{
    public class AppDBContent : DbContext
    {
        public AppDBContent(DbContextOptions<AppDBContent> options) : base(options)
        {

        }

        public AppDBContent() : base()
        {

        }

        public DbSet<UserModel> Users { get; set; }
        public DbSet<ContestModel> Contests { get; set; }
        public DbSet<OlympiadModel> Olympiads { get; set; }
        public DbSet<ThemeModel> Themes { get; set; }
        public DbSet<FirstDifficultyModel> FirstDifficulties { get; set; }

        public DbSet<TeacherModel> Teachers { get; set; }
        public DbSet<LessonModel> Lessons { get; set; }
        public DbSet<StudentModel> Students { get; set; }
        public DbSet<StudyGroupModel> StudyGroups { get; set; }

        public DbSet<TeamModel> Teams { get; set; }

        public DbSet<ParticipantModel> Participants { get; set; }
        public DbSet<SecondDifficultyModel> SecondDifficulties { get; set; }
        public DbSet<TaskModel> Tasks { get; set; }
        public DbSet<TaskThemeModel> TaskThemes {get; set;}
        public DbSet<ParticipantOlympiadModel> ParticipantOlympiads { get; set; }
        public DbSet<TaskContestModel> TaskContests { get; set; }
        public DbSet<SolutionModel> Solutions { get; set; }
    }

}
