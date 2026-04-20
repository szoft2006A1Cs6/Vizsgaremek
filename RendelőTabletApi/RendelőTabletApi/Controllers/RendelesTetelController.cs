using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RendelőTabletApi.Model;

namespace RendelőTabletApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RendelesTetelController : ControllerBase
    {
        private Context _context;

        public RendelesTetelController(Context context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.RendelesTetelek);
        }

        [HttpPost]
        public IActionResult Post(RendelesTetel tetel)
        {
            _context.RendelesTetelek.Add(tetel);
            _context.SaveChanges();
            return CreatedAtAction(nameof(Get), tetel);
        }

        [Authorize(Roles = "Staff")]
        [HttpPut("{id}")]
        public IActionResult Put(int id, RendelesTetel tetel)
        {
            var oldTetel = _context.RendelesTetelek.FirstOrDefault(rt => rt.TetelId == id);
            if (oldTetel == null) return NotFound();
            oldTetel.Mennyiseg = tetel.Mennyiseg;
            oldTetel.TermekId = tetel.TermekId;
            _context.SaveChanges();
            return Ok(oldTetel);
        }

        [Authorize(Roles = "Staff")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var tetel = _context.RendelesTetelek.FirstOrDefault(rt => rt.TetelId == id);
            if (tetel == null) return NotFound();
            _context.RendelesTetelek.Remove(tetel);
            _context.SaveChanges();
            return Ok(tetel);
        }
    }
}
