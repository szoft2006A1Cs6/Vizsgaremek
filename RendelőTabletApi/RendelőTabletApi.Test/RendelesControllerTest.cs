using Microsoft.AspNetCore.Mvc;
using RendelőTabletApi.Controllers;
using RendelőTabletApi.Model;

namespace RendelőTabletApi.Test
{
    [TestClass]
    public sealed class RendelesControllerTest
    {
        RendelesController? _sut;
        DbContextHelper? _db;

        [TestInitialize]
        public void Initialize()
        {
            _db = new DbContextHelper();
            _sut = new RendelesController(_db.CreateDbContext());
        }

        [TestMethod]
        public void Rendeles_Get_SikeresLekeres_VisszaadLista()
        {
            var result = _sut!.Get() as OkObjectResult;
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void Rendeles_GetById_ExtTrue_MindenAdatotBetolt()
        {
            var result = _sut!.Get(1, true) as OkObjectResult;
            Assert.IsNotNull(result);
            var rendeles = result.Value as Rendeles;
            Assert.IsNotNull(rendeles);
            // EF In-memory esetében a navigációs property-k betöltődnek az Include hatására
        }

        [TestMethod]
        public void Rendeles_GetById_NemLetezoId_VisszaadNotFound()
        {
            var result = _sut!.Get(999);
            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }

        [TestMethod]
        public void Rendeles_Post_ValidRendeles_VisszaadCreated()
        {
            var result = _sut!.Post(new Rendeles { AsztalId = 1, PincerId = 1, Statusz = 1 }) as CreatedAtActionResult;
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void Rendeles_Put_LetezoId_SikeresFrissites()
        {
            var frissitendo = new Rendeles { Statusz = 3, PincerId = 1, AsztalId = 1 };
            var result = _sut!.Put(1, frissitendo) as OkObjectResult;
            Assert.IsNotNull(result);
            Assert.AreEqual(3, (result.Value as Rendeles)!.Statusz);
        }

        [TestMethod]
        public void Rendeles_Delete_LetezoId_VisszaadOk()
        {
            var result = _sut!.Delete(1) as OkObjectResult;
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void Rendeles_TestAll_ChainTest()
        {
            // 1. Create
            var ujRendeles = new Rendeles { Statusz = 2, AsztalId = 1, PincerId = 1 };
            var created = _sut!.Post(ujRendeles) as CreatedAtActionResult;
            var letrehozottRendeles = created!.Value as Rendeles;
            
            // 2. Read
            var read = _sut.Get(letrehozottRendeles!.RendelesId) as OkObjectResult;
            Assert.IsNotNull(read);

            // 3. Update
            letrehozottRendeles.Statusz = 4;
            var updated = _sut.Put(letrehozottRendeles.RendelesId, letrehozottRendeles) as OkObjectResult;
            Assert.AreEqual(4, (updated!.Value as Rendeles)!.Statusz);

            // 4. Delete
            var deleted = _sut.Delete(letrehozottRendeles.RendelesId) as OkObjectResult;
            Assert.IsNotNull(deleted);
        }
    }
}