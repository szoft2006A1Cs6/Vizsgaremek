using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RendelőTabletApi.Model;

namespace RendelőTabletApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PincerHivasController : ControllerBase
    {
        private Context _context;

        public PincerHivasController(Context context)
        {
            _context = context;
        }

        [Authorize(Roles = "Staff")]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.PincerHivasok);
        }

        [Authorize(Roles = "Staff")]
        [HttpGet("{id}")]
        public IActionResult Get(int id, [FromQuery] bool ext = false)
        {
            PincerHivas? hivas = null;
            if (ext)
            {
                // Ha ext=true, behúzzuk az asztal adatait is a híváshoz
                hivas = _context.PincerHivasok
                            .Include(h => h.Asztal)
                            .FirstOrDefault(h => h.HivasId == id);
            }
            else
            {
                hivas = _context.PincerHivasok.FirstOrDefault(h => h.HivasId == id);
            }

            if (hivas == null) return NotFound();
            return Ok(hivas);
        }

        [Authorize]
        [HttpPost]
        public IActionResult Post(PincerHivas hivas)
        {
            // Opcionális: Alapértelmezett értékek beállítása, ha a kliens nem küldte el
            if (hivas.Idopont == default) hivas.Idopont = DateTime.Now;
            if (string.IsNullOrEmpty(hivas.Statusz)) hivas.Statusz = "Függőben";

            _context.PincerHivasok.Add(hivas);
            _context.SaveChanges();
            return CreatedAtAction(nameof(Get), new { id = hivas.HivasId }, hivas);
        }

        [Authorize(Roles = "Staff")]
        [HttpPut("{id}")]
        public IActionResult Put(int id, PincerHivas hivas)
        {
            var oldHivas = _context.PincerHivasok.FirstOrDefault(h => h.HivasId == id);
            if (oldHivas == null) return NotFound();

            // Általában csak a státuszt frissítjük egy hívásnál (pl. "Függőben" -> "Teljesítve")
            oldHivas.Statusz = hivas.Statusz;

            // Ha az asztalt is engedni akarod utólag módosítani:
            // oldHivas.AsztalId = hivas.AsztalId;

            _context.SaveChanges();
            return Ok(oldHivas);
        }

        [Authorize(Roles = "Staff")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var hivas = _context.PincerHivasok.FirstOrDefault(h => h.HivasId == id);
            if (hivas == null) return NotFound();

            _context.PincerHivasok.Remove(hivas);
            _context.SaveChanges();
            return Ok(hivas);
        }
    }
}