using RendelőTabletApi.DTO;
using RendelőTabletApi.Model;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace RendelőTabletApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        // Jelenleg a "1234" hash-e van beírva példaként.
        private const string MasterPasswordHash = "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4";

        // Itt adhatod meg a fix felhasználóneveket
        private readonly string[] _fixUsers = { "Konyha", "Asztal 1", "Asztal 2", "Asztal 3" };

        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
                return BadRequest("Hiányzó adatok.");

            if (!IsValidUser(request.Username))
                return Unauthorized(new { message = $"Ismeretlen felhasználó: '{request.Username}'" });

            if (!VerifyPassword(request.Password))
                return Unauthorized(new { message = $"Helytelen jelszó lett megadva ehhez: '{request.Username}'" });

            var role = request.Username.StartsWith("Asztal") ? "Guest" : "Staff";
            var token = GenerateJwtToken(request.Username, role);

            return Ok(new
            {
                message = "Sikeres bejelentkezés!",
                token = token,
                role = role
            });
        }

        [HttpGet("users")]
        public IActionResult GetUsers()
        {
            var users = _fixUsers.Select(u => new {
                id = u.ToLower().Replace(" ", ""),
                name = u
            }).ToList();

            return Ok(users);
        }

        private string GenerateJwtToken(string username, string role)
        {
            var jwtKey = _configuration["JwtSettings:Key"];
            var key = Encoding.ASCII.GetBytes(jwtKey);

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, username),
                    new Claim(ClaimTypes.Role, role)
                }),
                Expires = DateTime.UtcNow.AddHours(8),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private bool IsValidUser(string username)
        {
            string lowerUser = username.ToLower().Trim();

            if (_fixUsers.Contains(username))
            {
                return true;
            }

            return false;
        }

        private bool VerifyPassword(string inputPassword)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(inputPassword));
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString() == MasterPasswordHash;
            }
        }
    }
}
