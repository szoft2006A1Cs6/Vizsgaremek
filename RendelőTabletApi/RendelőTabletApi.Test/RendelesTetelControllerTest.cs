using Microsoft.AspNetCore.Mvc;
using RendelőTabletApi.Controllers;
using RendelőTabletApi.Model;

namespace RendelőTabletApi.Test
{
    [TestClass]
    public sealed class RendelesTetelControllerTest
    {
        RendelesTetelController? _sut;
        DbContextHelper? _db;

        [TestInitialize]
        public void Initialize()
        {
            _db = new DbContextHelper();
            _sut = new RendelesTetelController(_db.CreateDbContext());
        }

        [TestMethod]
        public void RendelesTetel_Get_SikeresLekeres_VisszaadLista()
        {
            var result = _sut!.Get() as OkObjectResult;
            Assert.IsNotNull(result);
            var lista = result.Value as IEnumerable<RendelesTetel>;
            Assert.IsNotNull(lista);
        }

        [TestMethod]
        public void RendelesTetel_Post_ValidTetel_VisszaadCreated()
        {
            var ujTetel = new RendelesTetel { Mennyiseg = 2, TermekId = 1 };
            var result = _sut!.Post(ujTetel) as CreatedAtActionResult;
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void RendelesTetel_Put_NemLetezoId_VisszaadNotFound()
        {
            var frissitendo = new RendelesTetel { Mennyiseg = 5, TermekId = 1 };
            var result = _sut!.Put(999, frissitendo);
            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }

        [TestMethod]
        public void RendelesTetel_TestAll_ChainTest()
        {
            // 1. Create
            var ujTetel = new RendelesTetel { Mennyiseg = 1, TermekId = 1 };
            var created = _sut!.Post(ujTetel) as CreatedAtActionResult;
            var letrehozott = created!.Value as RendelesTetel;

            Assert.IsNotNull(letrehozott);

            // 2. Update
            letrehozott.Mennyiseg = 3;
            var updated = _sut.Put(letrehozott.TetelId, letrehozott) as OkObjectResult;
            Assert.IsNotNull(updated);
            Assert.AreEqual(3, (updated.Value as RendelesTetel)!.Mennyiseg);

            // 3. Delete
            var deleted = _sut.Delete(letrehozott.TetelId) as OkObjectResult;
            Assert.IsNotNull(deleted);

            // 4. Verify Delete
            var verifyDelete = _sut.Delete(letrehozott.TetelId); // Újra törlésnek 404-et kell adnia
            Assert.IsInstanceOfType(verifyDelete, typeof(NotFoundResult));
        }
    }
}