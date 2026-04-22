using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RendelőTabletApi.Model;

namespace RendelőTabletApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TermekController : ControllerBase
    {
        private Context _context;

        public TermekController(Context context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Termekek);
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult Get(int id, [FromQuery] bool ext = false)
        {
            Termek? termek = null;
            if (ext)
            {
                termek = _context.Termekek
                            .Include(t => t.EtelTipus)
                            .FirstOrDefault(t => t.TermekId == id);
            }
            else
            {
                termek = _context.Termekek.FirstOrDefault(t => t.TermekId == id);
            }
            if (termek == null) return NotFound();
            return Ok(termek);
        }

        [Authorize(Roles = "Staff")]
        [HttpPost]
        public IActionResult Post(Termek termek)
        {
            _context.Termekek.Add(termek);
            _context.SaveChanges();
            return CreatedAtAction(nameof(Get), new { id = termek.TermekId }, termek);
        }

        [Authorize(Roles = "Staff")]
        [HttpPut("{id}")]
        public IActionResult Put(int id, Termek termek)
        {
            var oldTermek = _context.Termekek.FirstOrDefault(t => t.TermekId == id);
            if (oldTermek == null) return NotFound();

            oldTermek.TermekNev = termek.TermekNev;
            oldTermek.Ar = termek.Ar;
            oldTermek.EteltipusId = termek.EteltipusId;
            oldTermek.Allergenek = termek.Allergenek;
            oldTermek.Featured = termek.Featured;
            oldTermek.Kep = termek.Kep;

            _context.SaveChanges();
            return Ok(oldTermek);
        }

        [Authorize(Roles = "Staff")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var termek = _context.Termekek.FirstOrDefault(t => t.TermekId == id);
            if (termek == null) return NotFound();
            _context.Termekek.Remove(termek);
            _context.SaveChanges();
            return Ok(termek);
        }
    }
}