using System;
using TodoList.Models; 

namespace TodoList.Models
{
    public class TodoItemDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public TodoStatus? Status { get; set; }
    }
}