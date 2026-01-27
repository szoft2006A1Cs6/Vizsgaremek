using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RendelőTabletApi.Model;

namespace RendelőTabletApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EtelTipusController : ControllerBase
    {
        private Context _context;

        public EtelTipusController(Context context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.EtelTipusok);
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult Get(int id, [FromQuery] bool ext = false)
        {
            EtelTipus? tipus = null;
            if (ext)
            {
                tipus = _context.EtelTipusok
                            .Include(et => et.Termekek)
                            .FirstOrDefault(et => et.EteltipusId == id);
            }
            else
            {
                tipus = _context.EtelTipusok.FirstOrDefault(et => et.EteltipusId == id);
            }
            if (tipus == null) return NotFound();
            return Ok(tipus);
        }
    }
}
