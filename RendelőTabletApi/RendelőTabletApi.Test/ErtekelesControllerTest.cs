using Microsoft.AspNetCore.Mvc;
using RendelőTabletApi.Controllers;
using RendelőTabletApi.Model;

namespace RendelőTabletApi.Test
{
    [TestClass]
    public sealed class ErtekelesControllerTest
    {
        ErtekelesController? _sut;
        DbContextHelper? _db;

        [TestInitialize]
        public void Initialize()
        {
            _db = new DbContextHelper();
            _sut = new ErtekelesController(_db.CreateDbContext());
        }

        [TestMethod]
        public void Ertekeles_Get_SikeresLekeres_VisszaadLista()
        {
            var result = _sut!.Get() as OkObjectResult;
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void Ertekeles_Post_ValidErtekeles_VisszaadCreated()
        {
            var result = _sut!.Post(new Ertekeles()) as CreatedAtActionResult;
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void Ertekeles_Post_HibasAdatok_VisszaadBadRequest()
        {
            _sut!.ModelState.AddModelError("Ertek", "Hibás érték");
            if (!_sut.ModelState.IsValid)
            {
                var result = new BadRequestObjectResult(_sut.ModelState);
                Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
            }
        }

        [TestMethod]
        public void Ertekeles_Delete_LetezoId_VisszaadOk()
        {
            // Először létrehozunk egyet, hogy biztosan legyen
            var letrehozott = (_sut!.Post(new Ertekeles()) as CreatedAtActionResult)!.Value as Ertekeles;
            var result = _sut.Delete(letrehozott!.ErtekId) as OkObjectResult;
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void Ertekeles_Delete_NemLetezoId_VisszaadNotFound()
        {
            var result = _sut!.Delete(999);
            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }
    }
}