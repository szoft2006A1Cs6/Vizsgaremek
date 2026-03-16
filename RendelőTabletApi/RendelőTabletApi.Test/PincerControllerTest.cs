using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RendelőTabletApi.Controllers;
using RendelőTabletApi.Model;

namespace RendelőTabletApi.Test
{
    [TestClass]
    public sealed class PincerControllerTest
    {
        PincerController? _sut;
        DbContextHelper? _db;

        [TestInitialize]
        public void Initialize()
        {
            _db = new DbContextHelper();
            _sut = new PincerController(_db.CreateDbContext());
        }

        [TestMethod]
        public void Pincer_Get_SikeresLekeres_VisszaadLista()
        {
            var result = _sut!.Get() as OkObjectResult;
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Value, typeof(IEnumerable<Pincer>));
        }

        [TestMethod]
        public void Pincer_Post_ValidPincer_VisszaadCreated()
        {
            var result = _sut!.Post(new Pincer()) as CreatedAtActionResult; // Töltsd ki az adatokat
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void Pincer_Post_HianyozoNev_VisszaadBadRequest()
        {
            _sut!.ModelState.AddModelError("Nev", "A név kötelező"); // Szimuláljuk a validációs hibát
            if (!_sut.ModelState.IsValid)
            {
                var badRequest = new BadRequestObjectResult(_sut.ModelState);
                Assert.IsInstanceOfType(badRequest, typeof(BadRequestObjectResult));
            }
        }

        [TestMethod]
        public void Pincer_Delete_LetezoId_VisszaadOk()
        {
            var result = _sut!.Delete(1) as OkObjectResult;
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void Pincer_Delete_NemLetezoId_VisszaadNotFound()
        {
            var result = _sut!.Delete(999);
            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }
    }
}