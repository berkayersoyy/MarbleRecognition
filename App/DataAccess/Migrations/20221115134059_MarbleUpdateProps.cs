using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    public partial class MarbleUpdateProps : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Quality",
                table: "Marbles",
                newName: "SurfaceQuality");

            migrationBuilder.AddColumn<string>(
                name: "ColorQuality",
                table: "Marbles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<float>(
                name: "Surface",
                table: "Marbles",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ColorQuality",
                table: "Marbles");

            migrationBuilder.DropColumn(
                name: "Surface",
                table: "Marbles");

            migrationBuilder.RenameColumn(
                name: "SurfaceQuality",
                table: "Marbles",
                newName: "Quality");
        }
    }
}
