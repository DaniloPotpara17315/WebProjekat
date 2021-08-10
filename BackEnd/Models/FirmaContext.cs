using Microsoft.EntityFrameworkCore;

namespace BackEnd.Models{

    
    public class FirmaContext:DbContext{
        public DbSet<Firma> Firme{get;set;}
        public DbSet<Sektor> Sektori{get;set;}
        public DbSet<Radnik> Radnici{get;set;}
        public FirmaContext(DbContextOptions options) :base(options){
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder){
            modelBuilder.Entity<Sektor>().HasMany(x=>
                x.Radnici
            ).WithOne(y => y.Sektor)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}