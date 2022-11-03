using Autofac;
using Autofac.Extensions.DependencyInjection;
using Business.DependencyResolvers.Autofac;
using Core.DependencyResolvers;
using Core.Entities.Concrete;
using Core.Extensions;
using Core.Utilities.EmailHelper;
using Core.Utilities.IoC;
using DataAccess.Concrete.EntityFramework.Contexts;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebApp.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews().AddRazorRuntimeCompilation();

var emailConfig = builder.Configuration
    .GetSection("EmailConfiguration")
    .Get<EmailConfiguration>();
builder.Services.AddSingleton(emailConfig);

builder.Services.AddIdentity<User, IdentityRole<int>>(opt =>
    {
        opt.Password.RequiredLength = 8;
        opt.Password.RequireDigit = false;
        opt.Password.RequireUppercase = true;
        opt.Password.RequireLowercase = true;
        opt.Password.RequireNonAlphanumeric = false;
        opt.User.RequireUniqueEmail = true;
    })
    .AddRoles<IdentityRole<int>>()
    .AddEntityFrameworkStores<OppioContext>()
    .AddDefaultTokenProviders();

builder.Services.Configure<DataProtectionTokenProviderOptions>(opt =>
    opt.TokenLifespan = TimeSpan.FromHours(2));

builder.Services.AddDbContext<OppioContext>(options =>
    options.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=OppioBetaTest1234;Trusted_Connection=true")
);

builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory())
    .ConfigureContainer<ContainerBuilder>(b =>
    {
        b.RegisterModule(new AutofacBusinessModule());
    });

builder.Services.AddSession();

//CORS POLICY ON PRODUCTION
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowOrigin",
//         builder => builder.WithOrigins("http://localhost:3000"));
// });

builder.Services.AddDependencyResolvers(new ICoreModule[]
{
    new CoreModule(),
});

var app = builder.Build();

app.MigrateDatabase();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.ConfigureCustomExceptionMiddleware();

app.UseSession();

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();