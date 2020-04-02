using Microsoft.EntityFrameworkCore;
using WebAPISample.Models;

namespace WebAPISample.Data
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions options)
            :base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Seed data - needs migration
            modelBuilder.Entity<Movie>()
             .HasData(
                new Movie { MovieId = 1, Title = "The Departed", Genre = "Drama", Director = "Martin Scorsese", Url = "https://www.imdb.com/title/tt0407887/mediaviewer/rm981113088" },
                new Movie { MovieId = 2, Title = "The Dark Knight", Genre = "Drama", Director = "Christopher Nolan", Url = "https://www.imdb.com/title/tt0468569/mediaviewer/rm4023877632" },
                new Movie { MovieId = 3, Title = "Inception", Genre = "Drama", Director = "Christopher Nolan", Url = "https://www.imdb.com/title/tt1375666/mediaviewer/rm3426651392" },
                new Movie { MovieId = 4, Title = "Pineapple Express", Genre = "Comedy", Director = "David Gordon Green", Url = "https://www.imdb.com/title/tt0910936/mediaviewer/rm3325203968" },
                new Movie { MovieId = 5, Title = "Die Hard", Genre = "Action", Director = "John McTiernan", Url = "https://www.imdb.com/title/tt0095016/mediaviewer/rm270892032" }
             );

        }

        public DbSet<Movie> Movies { get; set; }
    }
}
