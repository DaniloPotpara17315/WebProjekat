using Microsoft.EntityFrameworkCore.Migrations;

namespace BackEnd.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Firme",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Tip = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Adresa = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Maxbudget = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Firme", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Sektori",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Budget = table.Column<int>(type: "int", nullable: false),
                    Opis = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    FirmaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sektori", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Sektori_Firme_FirmaID",
                        column: x => x.FirmaID,
                        principalTable: "Firme",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Radnici",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Prezime = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Rank = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Plata = table.Column<int>(type: "int", nullable: false),
                    SektorID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Radnici", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Radnici_Sektori_SektorID",
                        column: x => x.SektorID,
                        principalTable: "Sektori",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Radnici_SektorID",
                table: "Radnici",
                column: "SektorID");

            migrationBuilder.CreateIndex(
                name: "IX_Sektori_FirmaID",
                table: "Sektori",
                column: "FirmaID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Radnici");

            migrationBuilder.DropTable(
                name: "Sektori");

            migrationBuilder.DropTable(
                name: "Firme");
        }
    }
}
