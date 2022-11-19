using Core.Entities.Concrete;
using Entities.Concrete;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Concrete.EntityFramework.Contexts;

public class OppioContext: IdentityDbContext<IdentityUser<int>,IdentityRole<int>,int>
{
    public OppioContext()
    {
            
    }
    public OppioContext(DbContextOptions<OppioContext> options) : base(options)
    {

    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=MarbleRecognitionTest1;Trusted_Connection=true");
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Marble> Marbles { get; set; }
}