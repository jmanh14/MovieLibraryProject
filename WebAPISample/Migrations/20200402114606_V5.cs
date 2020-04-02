using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPISample.Migrations
{
    public partial class V5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "Movies",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Movies",
                keyColumn: "MovieId",
                keyValue: 1,
                column: "Url",
                value: "https://www.imdb.com/title/tt0407887/mediaviewer/rm981113088");

            migrationBuilder.UpdateData(
                table: "Movies",
                keyColumn: "MovieId",
                keyValue: 2,
                column: "Url",
                value: "https://www.imdb.com/title/tt0468569/mediaviewer/rm4023877632");

            migrationBuilder.UpdateData(
                table: "Movies",
                keyColumn: "MovieId",
                keyValue: 3,
                column: "Url",
                value: "https://www.imdb.com/title/tt1375666/mediaviewer/rm3426651392");

            migrationBuilder.UpdateData(
                table: "Movies",
                keyColumn: "MovieId",
                keyValue: 4,
                column: "Url",
                value: "https://www.imdb.com/title/tt0910936/mediaviewer/rm3325203968");

            migrationBuilder.UpdateData(
                table: "Movies",
                keyColumn: "MovieId",
                keyValue: 5,
                column: "Url",
                value: "https://www.imdb.com/title/tt0095016/mediaviewer/rm270892032");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Url",
                table: "Movies");
        }
    }
}
