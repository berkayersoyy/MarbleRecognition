using System.Security.Claims;
using Core.Entities.Concrete;
using DataAccess.Concrete.EntityFramework.Contexts;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.JsonWebTokens;

namespace DataAccess.Concrete.EntityFramework.Seeds;

public class DataSeeds
{
    public static async Task AdminUserSeedAsync(OppioContext dbContext,IServiceProvider serviceProvider)
    {
        if (!dbContext.Users.Any())
        {
            var user = GetPreconfiguredUyes().First();
            var userManager = serviceProvider.GetService<UserManager<User>>();
            var passwordHasher = serviceProvider.GetService<IPasswordHasher<User>>();
            await dbContext.Users.AddAsync(user);
            var hashedPassword = passwordHasher.HashPassword(user, "x03121998X+!");
            user.PasswordHash = hashedPassword;
            user.SecurityStamp = Guid.NewGuid().ToString();
            await dbContext.SaveChangesAsync();
                
            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Name,user.Email));
            claims.Add(new Claim(ClaimTypes.Role,"User"));
            claims.Add(new Claim(ClaimTypes.Role,"Admin"));
            claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
            await userManager.AddClaimsAsync(user, claims);
        }
    }

    public static IEnumerable<User> GetPreconfiguredUyes()
    {
        return new List<User>
        {
            new User
            {
                Avatar = "",
                Email = "admin@admin.com",
                Nickname = "admin",
                CityId = 0,
                EducationId = 0,
                SexId = 0,
                IncomeStatusId = 0,
                MarialStatusId = 0,
                EmploymentId = 0,
                NationalityId = 0,
                UserName = "admin@admin.com",
                DateOfBirth = DateTime.Now,
                Url = "",
                CreatedAt = 0,
            }
        };
    }
}