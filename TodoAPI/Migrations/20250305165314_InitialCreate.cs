using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TodoApi.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TodoItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    IsCompleted = table.Column<bool>(type: "INTEGER", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TodoItems", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "TodoItems",
                columns: new[] { "Id", "CreatedAt", "IsCompleted", "Title" },
                values: new object[] { 1, new DateTime(2025, 3, 5, 17, 53, 14, 658, DateTimeKind.Local).AddTicks(4070), false, "Build a REST API in .NET" });

            migrationBuilder.InsertData(
                table: "TodoItems",
                columns: new[] { "Id", "CreatedAt", "IsCompleted", "Title" },
                values: new object[] { 2, new DateTime(2025, 3, 5, 17, 53, 14, 658, DateTimeKind.Local).AddTicks(4073), false, "Learn What OpenAPI Is" });

            migrationBuilder.InsertData(
                table: "TodoItems",
                columns: new[] { "Id", "CreatedAt", "IsCompleted", "Title" },
                values: new object[] { 3, new DateTime(2025, 3, 5, 17, 53, 14, 658, DateTimeKind.Local).AddTicks(4075), false, "Make sure it dosent crash and burn" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TodoItems");
        }
    }
}
