using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RendelőTabletApi.Controllers;
using RendelőTabletApi.Model;

namespace RendelőTabletApi.Test
{
    [TestClass]
    public sealed class AsztalControllerTest
    {
        AsztalController? _sut;
        DbContextHelper? _db;

        [TestInitialize]
        public void Initialize()
        {
            _db = new DbContextHelper();
            _sut = new AsztalController(_db.CreateDbContext())
            {
                ControllerContext = new ControllerContext() { HttpContext = new DefaultHttpContext() }
            };
        }

        [TestMethod]
        public void Asztal_Get_SikeresLekeres_VisszaadLista()
        {
            var result = _sut!.Get() as OkObjectResult;
            Assert.IsNotNull(result);
            var lista = result.Value as IEnumerable<Asztal>;
            Assert.IsNotNull(lista);
            Assert.IsTrue(lista.Any());
        }

        [TestMethod]
        public void Asztal_GetById_LetezoId_VisszaadOk()
        {
            var result = _sut!.Get(1) as OkObjectResult;
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Value, typeof(Asztal));
        }

        [TestMethod]
        public void Asztal_GetById_NemLetezoId_VisszaadNotFound()
        {
            var result = _sut!.Get(999);
            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }

        [TestMethod]
        public void Asztal_Post_ValidAsztal_VisszaadCreated()
        {
            var ujAsztal = new Asztal { Ferohely = 6 };
            var result = _sut!.Post(ujAsztal) as CreatedAtActionResult;
            Assert.IsNotNull(result);
            Assert.AreEqual(nameof(_sut.Get), result.ActionName);
        }

        [TestMethod]
        public void Asztal_Put_NemLetezoId_VisszaadNotFound()
        {
            var result = _sut!.Put(999, new Asztal { Ferohely = 4 });
            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }

        [TestMethod]
        public void Asztal_TestAll_ChainTest()
        {
            // Create
            var asztal = new Asztal { Ferohely = 10 };
            var created = _sut!.Post(asztal) as CreatedAtActionResult;
            Assert.IsNotNull(created);
            var letrehozottAsztal = created.Value as Asztal;
            Assert.IsNotNull(letrehozottAsztal);

            // Read
            var read = _sut.Get(letrehozottAsztal.AsztalId) as OkObjectResult;
            Assert.IsNotNull(read);

            // Update
            letrehozottAsztal.Ferohely = 12;
            var updated = _sut.Put(letrehozottAsztal.AsztalId, letrehozottAsztal) as OkObjectResult;
            Assert.IsNotNull(updated);
            Assert.AreEqual(12, (updated.Value as Asztal)!.Ferohely);
        }
    }
}