using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RendelőTabletApi.Model;

namespace RendelőTabletApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AsztalController : ControllerBase
    {
        private Context _context;

        public AsztalController(Context context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Asztalok);
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var asztal = _context.Asztalok.FirstOrDefault(a => a.AsztalId == id);
            if (asztal == null) return NotFound();
            return Ok(asztal);
        }

        [Authorize(Roles = "Staff")]
        [HttpPost]
        public IActionResult Post(Asztal asztal)
        {
            _context.Asztalok.Add(asztal);
            _context.SaveChanges();
            return CreatedAtAction(nameof(Get), new { id = asztal.AsztalId }, asztal);
        }

        [Authorize(Roles = "Staff")]
        [HttpPut("{id}")]
        public IActionResult Put(int id, Asztal asztal)
        {
            var oldAsztal = _context.Asztalok.FirstOrDefault(a => a.AsztalId == id);
            if (oldAsztal == null) return NotFound();
            oldAsztal.Ferohely = asztal.Ferohely;
            _context.SaveChanges();
            return Ok(oldAsztal);
        }
    }
}
