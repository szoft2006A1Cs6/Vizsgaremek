using Microsoft.ApplicationInsights.Channel;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using UserAPI.Auth;
using UserAPI.Controllers;
using UserAPI.Database;
using UserAPI.Models;

namespace UserAPI.IntegrationTests
{
    [TestClass]
    public class LoginTests
    {
        private CustomWebApplicationFactory _factory;
        private HttpClient _client;

        [TestInitialize]
        public void Initialize()
        {
            _factory = new CustomWebApplicationFactory();
            _client = _factory.CreateClient();
        }

        [TestCleanup]
        public void Cleanup()
        {
            _client.Dispose();
            _factory.Dispose();
        }

        private async void GenerateData()
        {
            var email = "teszt@tesz.hu";
            var password = "Teszt12345!";

            PasswordHandler.CreatePasswordHash(password, out byte[] hash, out byte[] salt);

            var testUser = new ApplicationUser
            {
                Name = "Teszt Elek",
                Email = email,
                Role = "User",
                PasswdHash = hash,
                PasswdSalt = salt
            };

            //Eltárolás a tesztadatbázisba

            using (var scope = _factory.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<UserManagerContext>();
                db.ApplicationUser.Add(testUser);
                await db.SaveChangesAsync();
            }
        }

        [TestMethod]
        public async Task Login_WithValidCredentials_ReturnsOk()
        {
            //Előkészítés
            GenerateData();

            var loginData = new LoginDTO
            {
                Email = "teszt@tesz.hu",
                Passwd = "Teszt12345!"
            };

            //Végrehajtás
            var result = await _client.PostAsJsonAsync("/api/Login", loginData);

            //Ellenőrzés
            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);

            var token = await result.Content.ReadAsStringAsync();
            Assert.IsFalse(string.IsNullOrEmpty(token));
        }

        [TestMethod]
        public async Task Login_WithInvalidCredentials_ReturnsNotFound()
        {
            var loginData = new LoginDTO
            {
                Email = "nemletezo@email.hu",
                Passwd = "nemszamit"
            };

            var result = await _client.PostAsJsonAsync("/api/Login", loginData);

            Assert.AreEqual(HttpStatusCode.NotFound, result.StatusCode);
        }

        [TestMethod]
        public async Task Login_WithInvalidCredentials_Unauthorized()
        {
            GenerateData();
            var loginData = new LoginDTO
            {
                Email = "teszt@tesz.hu",
                Passwd = "hibásjelszó"
            };

            var result = await _client.PostAsJsonAsync("/api/Login", loginData);
            Assert.AreEqual(HttpStatusCode.Unauthorized, result.StatusCode);
        }
    }
}
