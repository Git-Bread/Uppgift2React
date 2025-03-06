using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TodoApi.Migrations
{
    public partial class ConvertStatusToEnum : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsCompleted",
                table: "TodoItems",
                newName: "Status");

            migrationBuilder.UpdateData(
                table: "TodoItems",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "Status" },
                values: new object[] { new DateTime(2025, 3, 7, 0, 51, 50, 181, DateTimeKind.Local).AddTicks(9361), 0 });

            migrationBuilder.UpdateData(
                table: "TodoItems",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "Status" },
                values: new object[] { new DateTime(2025, 3, 7, 0, 51, 50, 181, DateTimeKind.Local).AddTicks(9364), 0 });

            migrationBuilder.UpdateData(
                table: "TodoItems",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "Status" },
                values: new object[] { new DateTime(2025, 3, 7, 0, 51, 50, 181, DateTimeKind.Local).AddTicks(9367), 0 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Status",
                table: "TodoItems",
                newName: "IsCompleted");

            migrationBuilder.UpdateData(
                table: "TodoItems",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "IsCompleted" },
                values: new object[] { new DateTime(2025, 3, 5, 17, 53, 14, 658, DateTimeKind.Local).AddTicks(4070), false });

            migrationBuilder.UpdateData(
                table: "TodoItems",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "IsCompleted" },
                values: new object[] { new DateTime(2025, 3, 5, 17, 53, 14, 658, DateTimeKind.Local).AddTicks(4073), false });

            migrationBuilder.UpdateData(
                table: "TodoItems",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "IsCompleted" },
                values: new object[] { new DateTime(2025, 3, 5, 17, 53, 14, 658, DateTimeKind.Local).AddTicks(4075), false });
        }
    }
}
