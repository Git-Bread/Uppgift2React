using Microsoft.EntityFrameworkCore;
using TodoList.Models;
using System;

namespace TodoApi.Data
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options)
            : base(options)
        {
        }

        public DbSet<TodoItem> TodoItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            //Seed some initial data
            modelBuilder.Entity<TodoItem>().HasData(
                new TodoItem { 
                    Id = 1, 
                    Title = "Build a REST API in .NET", 
                    Description = "Create a full CRUD API with proper error handling and documentation",
                    Status = TodoStatus.NotStarted, 
                    CreatedAt = DateTime.Now 
                },
                new TodoItem { 
                    Id = 2, 
                    Title = "Learn What OpenAPI Is", 
                    Description = "Study Swagger/OpenAPI specifications and implementation",
                    Status = TodoStatus.NotStarted, 
                    CreatedAt = DateTime.Now 
                },
                new TodoItem { 
                    Id = 3, 
                    Title = "Make sure it dosent crash and burn", 
                    Description = "Putting out fires",
                    Status = TodoStatus.NotStarted, 
                    CreatedAt = DateTime.Now 
                }
            );
        }
    }
}