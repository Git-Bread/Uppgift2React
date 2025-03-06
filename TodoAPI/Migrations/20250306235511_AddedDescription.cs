using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TodoApi.Migrations
{
    public partial class AddedDescription : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "TodoItems",
                type: "TEXT",
                maxLength: 500,
                nullable: true);

            migrationBuilder.UpdateData(
                table: "TodoItems",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "Description" },
                values: new object[] { new DateTime(2025, 3, 7, 0, 55, 10, 887, DateTimeKind.Local).AddTicks(9263), "Create a full CRUD API with proper error handling and documentation" });

            migrationBuilder.UpdateData(
                table: "TodoItems",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "Description" },
                values: new object[] { new DateTime(2025, 3, 7, 0, 55, 10, 887, DateTimeKind.Local).AddTicks(9266), "Study Swagger/OpenAPI specifications and implementation" });

            migrationBuilder.UpdateData(
                table: "TodoItems",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "Description" },
                values: new object[] { new DateTime(2025, 3, 7, 0, 55, 10, 887, DateTimeKind.Local).AddTicks(9269), "Putting out fires" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "TodoItems");

            migrationBuilder.UpdateData(
                table: "TodoItems",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 7, 0, 51, 50, 181, DateTimeKind.Local).AddTicks(9361));

            migrationBuilder.UpdateData(
                table: "TodoItems",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 7, 0, 51, 50, 181, DateTimeKind.Local).AddTicks(9364));

            migrationBuilder.UpdateData(
                table: "TodoItems",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 7, 0, 51, 50, 181, DateTimeKind.Local).AddTicks(9367));
        }
    }
}
