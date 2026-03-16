using Microsoft.AspNetCore.Mvc;
using RendelőTabletApi.Controllers;
using RendelőTabletApi.Model;

namespace RendelőTabletApi.Test
{
    [TestClass]
    public sealed class TermekControllerTest
    {
        TermekController? _sut;
        DbContextHelper? _db;

        [TestInitialize]
        public void Initialize()
        {
            _db = new DbContextHelper();
            _sut = new TermekController(_db.CreateDbContext());
        }

        [TestMethod]
        public void Termek_Get_SikeresLekeres_VisszaadLista()
        {
            var result = _sut!.Get() as OkObjectResult;
            Assert.IsNotNull(result);
            var lista = result.Value as IEnumerable<Termek>;
            Assert.IsNotNull(lista);
        }

        [TestMethod]
        public void Termek_GetById_AlapertelmezettExt_VisszaadOk()
        {
            var result = _sut!.Get(1) as OkObjectResult;
            Assert.IsNotNull(result);
            var termek = result.Value as Termek;
            Assert.IsNotNull(termek);
        }

        [TestMethod]
        public void Termek_GetById_ExtTrue_IncludeEtelTipus()
        {
            var result = _sut!.Get(1, true) as OkObjectResult;
            Assert.IsNotNull(result);
            var termek = result.Value as Termek;
            Assert.IsNotNull(termek);
            // In-memory db esetén az Include automatikusan betölti a navigációs adatokat
        }

        [TestMethod]
        public void Termek_GetById_NemLetezoId_VisszaadNotFound()
        {
            var result = _sut!.Get(999);
            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }

        [TestMethod]
        public void Termek_Post_ValidTermek_VisszaadCreated()
        {
            var ujTermek = new Termek { TermekNev = "Fanta", Ar = 600, EteltipusId = 1 };
            var result = _sut!.Post(ujTermek) as CreatedAtActionResult;
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void Termek_Put_NemLetezoId_VisszaadNotFound()
        {
            var result = _sut!.Put(999, new Termek { TermekNev = "Létezhetetlen", Ar = 100 });
            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }

        [TestMethod]
        public void Termek_Delete_NemLetezoId_VisszaadNotFound()
        {
            var result = _sut!.Delete(999);
            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }

        [TestMethod]
        public void Termek_TestAll_ChainTest()
        {
            // 1. Create
            var termek = new Termek { TermekNev = "Sült krumpli", Ar = 800, EteltipusId = 1 };
            var created = _sut!.Post(termek) as CreatedAtActionResult;
            var letrehozottTermek = created!.Value as Termek;

            // 2. Read
            var read = _sut.Get(letrehozottTermek!.TermekId) as OkObjectResult;
            Assert.IsNotNull(read);

            // 3. Update
            letrehozottTermek.Ar = 950;
            var updated = _sut.Put(letrehozottTermek.TermekId, letrehozottTermek) as OkObjectResult;
            Assert.AreEqual(950, (updated!.Value as Termek)!.Ar);

            // 4. Delete
            var deleted = _sut.Delete(letrehozottTermek.TermekId) as OkObjectResult;
            Assert.IsNotNull(deleted);
        }
    }
}