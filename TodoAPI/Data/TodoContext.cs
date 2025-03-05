using TodoAPI.EntityFrameworkCore;
using TodoAPI.Models;

namespace TodoAPI.Data
{
    public class TodoContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<TodoItem> TodoItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Seed some initial data
            modelBuilder.Entity<TodoItem>().HasData(
                new TodoItem { Id = 1, Title = "Build a REST API in .NET", IsCompleted = false },
                new TodoItem { Id = 2, Title = "Learn What Swagger Is", IsCompleted = false },
                new TodoItem { Id = 3, Title = "Make sure it dosent crash and burn", IsCompleted = false }
            );
        }
    }
}