# Todo API

REST API built with .NET 6 for managing todo items with full CRUD operations and Swagger documentation.

## Project Overview

This Todo API provides a complete backend for managing todo items, featuring:

- **RESTful Endpoints**: Full CRUD operations for todo items
- **Data Persistence**: SQLite database with Entity Framework Core
- **API Documentation**: Swagger/OpenAPI integration
- **Input Validation**: Built-in validation for data integrity
- **Consistent Responses**: Standardized JSON response format
- **CORS Support**: Configured for cross-origin requests

## Project Structure

- **Controllers**: Contains the API controller
  - `TodoController.cs`: Handles all todo item operations

- **Models**: Data models and DTOs
  - `TodoItem.cs`: The core entity model
  - `TodoItemDTO.cs`: Data Transfer Object for input operations

- **Data**: Database context and configuration
  - `TodoContext.cs`: EF Core DbContext with seed data

- **Migrations**: Database migration files
  - Generated EF Core migrations for database schema

- **Program.cs**: Application entry point

- **Startup.cs**: Application configuration

## API Endpoints

| Method | Endpoint               | Description                        |
|--------|------------------------|------------------------------------|
| GET    | `/api/todo`            | Get all todo items                 |
| GET    | `/api/todo/{id}`       | Get a specific todo item           |
| POST   | `/api/todo`            | Create a new todo item             |
| PUT    | `/api/todo/{id}`       | Update an existing todo item       |
| DELETE | `/api/todo/{id}`       | Delete a todo item                 |
| PATCH  | `/api/todo/{id}/change-status` | Toggle completion status   |

## Response Format

All API responses follow a consistent format:

```json
{
  "status": 200,
  "data": { ... },
  "title": "Success",
  "message": "Operation completed successfully"
}

- By maga2101