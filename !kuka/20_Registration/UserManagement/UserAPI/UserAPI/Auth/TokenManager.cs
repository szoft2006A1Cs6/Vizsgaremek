using System.Security.Claims;
using System.Text;
using UserAPI.Models;
using Microsoft.IdentityModel.Tokens;
// using Microsoft.AspNetCore.Builder;
using System.Data;
using System.IdentityModel.Tokens.Jwt;

namespace UserAPI.Auth
{
    public class TokenManager
    {
        private string _secretKey = string.Empty;
        private string _issuer = string.Empty;
        private string _audience = string.Empty;
        private Dictionary<string, List<string>> _rolesPermissions = [];

        public List<string> Permissions
        {
            get
            {
                var permissions = new List<string>();
                foreach (var values in _rolesPermissions.Values)
                {
                    permissions.AddRange(values);
                }
                return permissions;
            }
        }

        public TokenManager(IConfiguration configuration) 
        {
            _secretKey = configuration["Auth:JWT:Key"]!;
            _issuer = configuration["Auth:JWT:Issuer"]!;
            _audience = configuration["Auth:JWT:Audience"]!;


            var rolesSection = configuration.GetSection("Auth:Roles");
            if (rolesSection.Exists())
            {
                foreach (var role in rolesSection.GetChildren())
                {

                    if (!_rolesPermissions.ContainsKey(role.Key))
                    {
                        _rolesPermissions[role.Key] = new List<string>();
                    }


                    foreach (var permission in role.GetChildren())
                    {
                        if (!string.IsNullOrEmpty(permission.Value))
                        {
                            _rolesPermissions[role.Key].Add(permission.Value);
                        }
                    }
                }
            }
        }

        public string GenerateToken(ApplicationUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Email!),
                new Claim(ClaimTypes.Role, user.Role ?? "User")
            };


            if (user.Role != null && _rolesPermissions.TryGetValue(user.Role, out var permissions))
            {
                foreach (var permission in permissions)
                {
                    claims.Add(new Claim("permission", permission));
                }
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _issuer,
                audience: _audience,
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public void RemoveToken(string? header)
        {
            var parts = header?.Split(" ");
            if (parts == null || parts.Length < 2 || parts[0] != "Bearer") 
            {
                throw new ApplicationException("Érvénytelen token!");
            }
            var token = parts[1];
        }
    }
}