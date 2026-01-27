using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RendelőTabletApi.Model;

namespace RendelőTabletApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ErtekelesController : ControllerBase
    {
        private Context _context;

        public ErtekelesController(Context context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Ertekelesek);
        }

        [Authorize]
        [HttpPost]
        public IActionResult Post(Ertekeles ertekeles)
        {
            _context.Ertekelesek.Add(ertekeles);
            _context.SaveChanges();
            return CreatedAtAction(nameof(Get), ertekeles);
        }

        [Authorize(Roles = "Staff")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var ertekeles = _context.Ertekelesek.FirstOrDefault(e => e.ErtekId == id);
            if (ertekeles == null) return NotFound();
            _context.Ertekelesek.Remove(ertekeles);
            _context.SaveChanges();
            return Ok(ertekeles);
        }
    }
}
