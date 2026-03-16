using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserAPI.Auth;
using UserAPI.Database;

namespace UserAPI.Controllers
{
    public class LoginDTO
    {
        public string? Email { get; set; }
        public string? Passwd { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly UserManagerContext _ctx;
        private readonly TokenManager _tokenManager;
        public LoginController(UserManagerContext ctx, TokenManager tokenManager)
        {
            _ctx = ctx;
            _tokenManager = tokenManager;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginDTO value)
        {
            var user = await _ctx.ApplicationUser
                                .FirstOrDefaultAsync(x => x.Email == value.Email);
            if (user == null) return NotFound();

            var result = PasswordHandler.VerifyPasswordHash
                                (value.Passwd!, user.PasswdHash!, user.PasswdSalt!);
            if (!result) return Unauthorized();

            var token = _tokenManager.GenerateToken(user);
            return Ok(token);
        }

        [Authorize]
        [HttpDelete]
        public IActionResult Logout()
        {
            _tokenManager.RemoveToken(Request.Headers.Authorization);
            return Ok();
        }
    }
}
