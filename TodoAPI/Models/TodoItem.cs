using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoList.Models
{
    public enum TodoStatus
    {
        NotStarted,
        Ongoing,
        Completed
    }

    public class TodoItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] //for clarity
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Title { get; set; }
        
        [StringLength(500)]
        public string Description { get; set; }
        
        [Required]
        public TodoStatus Status { get; set; } = TodoStatus.NotStarted;
        
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}