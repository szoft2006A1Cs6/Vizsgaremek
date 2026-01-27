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
        // Jelenleg a "Password" hash-e van beírva példaként.
        private const string MasterPasswordHash = "e7cf3ef4f17c3999a94f2c6f612e8a888e5b1026878e4e19398b23bd38ec221a";

        // Itt adhatod meg a fix felhasználóneveket
        private readonly string[] _fixUsers = { "konyha", "pénztár", "pult", "asztal1" };

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

            if (!IsValidUser(request.Username) || !VerifyPassword(request.Password))
                return Unauthorized(new { message = "Hibás felhasználónév vagy jelszó." });

            var role = request.Username.StartsWith("asztal") ? "Guest" : "Staff";
            var token = GenerateJwtToken(request.Username, role);

            return Ok(new
            {
                message = "Sikeres bejelentkezés!",
                token = token,
                role = role
            });
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

            if (_fixUsers.Contains(lowerUser))
            {
                return true;
            }

            if (lowerUser.StartsWith("asztal"))
            {
                string numberPart = lowerUser.Substring(6);
                if (int.TryParse(numberPart, out int tableNumber))
                {
                    return tableNumber > 0 && tableNumber < 100;
                }
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
