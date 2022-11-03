using DataAccess.Concrete.EntityFramework.Contexts;
using DataAccess.Concrete.EntityFramework.Seeds;
using Microsoft.EntityFrameworkCore;

namespace WebApp.Extensions;

public static class MigrationManager
{
    public static IHost MigrateDatabase(this IHost host)
    {
        using (var scope = host.Services.CreateScope())
        {
            try
            {
                var oppioContext = scope.ServiceProvider.GetRequiredService<OppioContext>();

                if (oppioContext.Database.ProviderName!="Microsoft.EntityFrameworkCore.InMemory")
                {
                    oppioContext.Database.Migrate();  
                }

                DataSeeds.AdminUserSeedAsync(oppioContext,scope.ServiceProvider).Wait();

            }
            catch (Exception ex)
            {
                throw;
            }
        }

        return host;
    }
}