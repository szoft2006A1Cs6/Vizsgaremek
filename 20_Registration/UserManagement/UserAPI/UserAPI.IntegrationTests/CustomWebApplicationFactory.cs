using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using System.Collections.Generic;
using UserAPI.Database;

namespace UserAPI.IntegrationTests
{
    public class CustomWebApplicationFactory : WebApplicationFactory<Program>
    {
        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureAppConfiguration((context, config) =>
            {
                config.AddInMemoryCollection(new Dictionary<string, string>
                    {
                        {"Auth:JWT:Key", "EzEgyNagyonHosszuTitkosKulcsAmiLegalabb16Karakter"},
                        {"Auth:JWT:Issuer", "TestIssuer"},
                        {"Auth:JWT:Audience", "TestAudience"},

                        {"Auth:Roles:User:0", "CanLogin"},
                        {"Auth:Roles:Admin:0", "AllAccess"}
                    });
            });

            builder.ConfigureServices(services =>
            {
                services.RemoveAll(typeof(DbContextOptions<UserManagerContext>));
                services.AddDbContext<UserManagerContext>(options =>
                {
                    options.UseInMemoryDatabase("InMemoryDbForTesting_MSTest");
                });
            });
        }
    }
}