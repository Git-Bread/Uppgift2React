using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoList.Models;
using TodoApi.Data;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly TodoContext _context;

        public TodoController(TodoContext context)
        {
            _context = context;
        }

        //GET: api/Todo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems()
        {
            try
            {
                var items = await _context.TodoItems.ToListAsync();
                
                return Ok(new {
                    status = 200,
                    data = items,
                    title = "Success",
                    message = $"Successfully retrieved {items.Count} todo items"
                });
            }
            catch (Exception e)
            {
                return StatusCode(500, new 
                { 
                    status = 500, //technicaly not needed, but keeps the api consistent
                    errors = $"Failed to retrieve todo items: {e.Message}",
                    title = "Database Error"
                });
            }
        }

        //GET: api/Todo/id
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItem>> GetTodoItem(int id)
        {
            try 
            {
                var todoItem = await _context.TodoItems.FindAsync(id);

                if (todoItem == null)
                {
                    return NotFound(new 
                    { 
                        status = 404,
                        errors = $"Todo item with ID {id} not found",
                        title = "Resource Not Found"
                    });
                }

                return Ok(new {
                    status = 200,
                    data = todoItem,
                    title = "Success",
                    message = $"Successfully retrieved todo item with ID {id}"
                });
            }
            catch (Exception e)
            {
                return StatusCode(500, new 
                { 
                    status = 500,
                    errors = $"Failed to retrieve todo item: {e.Message}",
                    title = "Database Broke"
                });
            }
        }

        //POST: api/Todo
        [HttpPost]
        public async Task<ActionResult<TodoItem>> CreateTodoItem(TodoItemDTO todoItemDTO)
        {
            try
            {
                // Validation
                if (string.IsNullOrWhiteSpace(todoItemDTO.Title))
                {
                    return BadRequest(new 
                    { 
                        status = 400,
                        errors = "Title cannot be empty",
                        title = "Validation Error"
                    });
                }

                var todoItem = new TodoItem
                {
                    Title = todoItemDTO.Title,
                    IsCompleted = todoItemDTO.IsCompleted ?? false,
                    CreatedAt = DateTime.Now
                };
                
                _context.TodoItems.Add(todoItem);
                await _context.SaveChangesAsync();

                return CreatedAtAction(
                    nameof(GetTodoItem), 
                    new { id = todoItem.Id }, 
                    new {
                        status = 201,
                        data = todoItem,
                        title = "Created",
                        message = $"Successfully created todo item with ID {todoItem.Id}"
                    }
                );
            }
            catch (Exception e)
            {
                return StatusCode(500, new 
                { 
                    status = 500,
                    errors = $"Failed to create todo item: {e.Message}",
                    title = "Database Broke"
                });
            }
        }

        //PUT: api/Todo/id
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodoItem(int id, TodoItemDTO todoItemDTO)
        {
            try
            {
                // Validation
                if (string.IsNullOrWhiteSpace(todoItemDTO.Title))
                {
                    return BadRequest(new 
                    { 
                        status = 400,
                        errors = "Title cannot be empty",
                        title = "Validation Error"
                    });
                }
            
                // Find the existing entity
                var todoItem = await _context.TodoItems.FindAsync(id);
                
                if (todoItem == null)
                {
                    return NotFound(new 
                    { 
                        status = 404,
                        errors = $"Todo item with ID {id} not found",
                        title = "Resource Not Found"
                    });
                }
                
                todoItem.Title = todoItemDTO.Title;
                todoItem.IsCompleted = todoItemDTO.IsCompleted ?? false;
                await _context.SaveChangesAsync();

                return Ok(new {
                    status = 200,
                    data = todoItem,
                    title = "Success",
                    message = $"Successfully updated todo item with ID {id}"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new 
                { 
                    status = 500,
                    errors = $"Failed to update todo item: {ex.Message}",
                    title = "Database Broke"
                });
            }
        }

        //DELETE: api/Todo/id
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(int id)
        {
            try
            {
                var todoItem = await _context.TodoItems.FindAsync(id);
                if (todoItem == null)
                {
                    return NotFound(new 
                    { 
                        status = 404,
                        errors = $"Todo item with ID {id} not found",
                        title = "Resource Not Found"
                    });
                }

                _context.TodoItems.Remove(todoItem);
                await _context.SaveChangesAsync();

                return Ok(new {
                    status = 200,
                    title = "Success",
                    message = $"Successfully deleted todo item with ID {id}"
                });
            }
            catch (Exception e)
            {
                return StatusCode(500, new 
                { 
                    status = 500,
                    errors = $"Failed to delete todo item: {e.Message}",
                    title = "Database Broke"
                });
            }
        }

        //like put but only changes one field instead of entire object, neat
        //PATCH: api/Todo/id/change-status
        [HttpPatch("{id}/change-status")]
        public async Task<IActionResult> ChangeTodoItem(int id)
        {
            try
            {
                var todoItem = await _context.TodoItems.FindAsync(id);
                
                if (todoItem == null)
                {
                    return NotFound(new 
                    { 
                        status = 404,
                        errors = $"Todo item with ID {id} not found",
                        title = "Resource Not Found"
                    });
                }

                string statusMessage;
                if (todoItem.IsCompleted)
                {
                    todoItem.IsCompleted = false;
                    statusMessage = "marked as incomplete";
                }
                else {
                    todoItem.IsCompleted = true;
                    statusMessage = "marked as complete";
                }
                
                await _context.SaveChangesAsync();

                return Ok(new {
                    status = 200,
                    data = todoItem,
                    title = "Success",
                    message = $"Successfully {statusMessage} todo item with ID {id}"
                });
            }
            catch (Exception e)
            {
                return StatusCode(500, new 
                { 
                    status = 500,
                    errors = $"Failed to change status of todo item: {e.Message}",
                    title = "Database Error"
                });
            }
        }
    }
}