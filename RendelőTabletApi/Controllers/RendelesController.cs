using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RendelőTabletApi.Model;

namespace RendelőTabletApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RendelesController : ControllerBase
    {
        private Context _context;

        public RendelesController(Context context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Rendelesek);
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult Get(int id, [FromQuery] bool ext = false)
        {
            Rendeles? rendeles = null;
            if (ext)
            {
                rendeles = _context.Rendelesek
                            .Include(r => r.RendelesTetelek)
                            .Include(r => r.Pincer)
                            .Include(r => r.Asztal)
                            .FirstOrDefault(r => r.RendelesId == id);
            }
            else
            {
                rendeles = _context.Rendelesek.FirstOrDefault(r => r.RendelesId == id);
            }
            if (rendeles == null) return NotFound();
            return Ok(rendeles);
        }

        [Authorize]
        [HttpPost]
        public IActionResult Post(Rendeles rendeles)
        {
            _context.Rendelesek.Add(rendeles);
            _context.SaveChanges();
            return CreatedAtAction(nameof(Get), new { id = rendeles.RendelesId }, rendeles);
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Put(int id, Rendeles rendeles)
        {
            var oldRendeles = _context.Rendelesek.FirstOrDefault(r => r.RendelesId == id);
            if (oldRendeles == null) return NotFound();

            oldRendeles.Statusz = rendeles.Statusz;
            oldRendeles.PincerId = rendeles.PincerId;
            oldRendeles.AsztalId = rendeles.AsztalId;

            _context.SaveChanges();
            return Ok(oldRendeles);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var rendeles = _context.Rendelesek.FirstOrDefault(r => r.RendelesId == id);
            if (rendeles == null) return NotFound();
            _context.Rendelesek.Remove(rendeles);
            _context.SaveChanges();
            return Ok(rendeles);
        }
    }
}
