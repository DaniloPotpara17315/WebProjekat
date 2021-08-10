using Microsoft.EntityFrameworkCore.Migrations;

namespace BackEnd.Migrations
{
    public partial class V2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Radnici_Sektori_SektorID",
                table: "Radnici");

            migrationBuilder.AddForeignKey(
                name: "FK_Radnici_Sektori_SektorID",
                table: "Radnici",
                column: "SektorID",
                principalTable: "Sektori",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Radnici_Sektori_SektorID",
                table: "Radnici");

            migrationBuilder.AddForeignKey(
                name: "FK_Radnici_Sektori_SektorID",
                table: "Radnici",
                column: "SektorID",
                principalTable: "Sektori",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
