using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using UserAPI.Auth;
using UserAPI.Database;
using UserAPI.Models;
using ZstdSharp.Unsafe;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UserAPI.Controllers
{
    public class UserDTO
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Passwd { get; set; }
        public string? Role { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? Gender { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {
        private readonly UserManagerContext _ctx;
        public ApplicationUserController(UserManagerContext ctx)
        {
            _ctx = ctx;
        }

        private bool IsAdminOrOwner(int resourceId)
        {
            if (User.IsInRole("Admin"))
                return true;

            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (int.TryParse(currentUserId, out int currentId))
                return currentId == resourceId;

            return false;
        }

        // GET: api/<ApplicationUserController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> Get()
        {
            if (!User.IsInRole("Admin"))
                return Forbid();

            return await _ctx.ApplicationUser.ToListAsync();
        }

        // GET api/<ApplicationUserController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ApplicationUser>> Get(int id)
        {
            if(!IsAdminOrOwner(id))
                return Forbid();

            var result = await _ctx.ApplicationUser.FindAsync(id);
            if (result == null) return NotFound();
            return result;
        }

        // POST api/<ApplicationUserController>
        [HttpPost]
        public async Task<ActionResult<ApplicationUser>> Post([FromBody] UserDTO value)
        {
            if(string.IsNullOrEmpty(value.Name) || string.IsNullOrEmpty(value.Email) 
                || string.IsNullOrEmpty(value.Passwd))
                return BadRequest("Hibás vagy hiányzó adatok!");

            var storedUser = await _ctx.ApplicationUser
                                    .FirstOrDefaultAsync(x => x.Email == value.Email);
            if (storedUser != null)
                return BadRequest("Az email már regisztrálva van!");

            PasswordHandler.CreatePasswordHash(value.Passwd, out byte[] hash, out byte[] salt);

            var user = new ApplicationUser
            {
                Name = value.Name,
                Email = value.Email,
                Role = "User",
                PasswdHash = hash,
                PasswdSalt = salt,
                BirthDate = value.BirthDate,
                Gender = value.Gender
            };
            _ctx.ApplicationUser.Add(user);
            await _ctx.SaveChangesAsync();
            return CreatedAtAction(
                nameof(Get),
                new { id = user.Id },
                user);
        }

        // PUT api/<ApplicationUserController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] UserDTO value)
        {
            if (string.IsNullOrEmpty(value.Name) || string.IsNullOrEmpty(value.Email)
                || string.IsNullOrEmpty(value.Passwd))
                return BadRequest("Hibás vagy hiányzó adatok!");

            if (!IsAdminOrOwner(id))
                return Forbid();

            var result = await _ctx.ApplicationUser.FindAsync(id);
            if(result == null) return NotFound();

            PasswordHandler.CreatePasswordHash(value.Passwd, out byte[] hash, out byte[] salt);

            result.Name = value.Name;
            result.PasswdHash = hash;
            result.PasswdSalt = salt;
            result.BirthDate = value.BirthDate;
            result.Gender = value.Gender;

            if (User.IsInRole("Admin"))
            {
                result.Email = value.Email;
                result.Role = value.Role;
            }
            
            await _ctx.SaveChangesAsync();
            return NoContent();
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult> Patch(int id, [FromBody] UserDTO value)
        {
            if (!IsAdminOrOwner(id))
                return Forbid();

            var result = await _ctx.ApplicationUser.FindAsync(id);
            if (result == null) return NotFound();
            if(value.Name != null)
                result.Name = value.Name;
            if(value.Passwd != null)
            {
                PasswordHandler.CreatePasswordHash(value.Passwd, out byte[] hash, out byte[] salt);
                result.PasswdHash = hash;
                result.PasswdSalt = salt;
            }
            if(value.BirthDate != null)
                result.BirthDate = value.BirthDate;
            if(value.Gender != null)
                result.Gender = value.Gender;

            if (User.IsInRole("Admin"))
            {
                if(value.Email != null)
                    result.Email = value.Email;
                if(value.Role != null)
                    result.Role = value.Role;
            }

            await _ctx.SaveChangesAsync();
            return NoContent();
        }

        // DELETE api/<ApplicationUserController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            if (!IsAdminOrOwner(id))
                return Forbid();

            var result = await _ctx.ApplicationUser.FindAsync(id);
            if(result == null) return NotFound();
            _ctx.ApplicationUser.Remove(result);
            await _ctx.SaveChangesAsync();
            return NoContent();
        }
    }
}
