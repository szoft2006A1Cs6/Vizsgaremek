using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RendelőTabletApi.Model;

namespace RendelőTabletApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PincerController : ControllerBase
    {
        private Context _context;

        public PincerController(Context context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Pincerek);
        }

        [Authorize(Roles = "Staff")]
        [HttpPost]
        public IActionResult Post(Pincer pincer)
        {
            _context.Pincerek.Add(pincer);
            _context.SaveChanges();
            return CreatedAtAction(nameof(Get), pincer);
        }

        [Authorize(Roles = "Staff")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var pincer = _context.Pincerek.FirstOrDefault(p => p.PincerId == id);
            if (pincer == null) return NotFound();
            _context.Pincerek.Remove(pincer);
            _context.SaveChanges();
            return Ok(pincer);
        }
    }
}
