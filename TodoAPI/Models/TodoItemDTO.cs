using System;

namespace TodoList.Models
{
    public class TodoItemDTO
    {
        public string Title { get; set; }
        public bool? IsCompleted { get; set; }
    }
}