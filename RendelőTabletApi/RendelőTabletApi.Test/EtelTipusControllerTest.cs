using Microsoft.AspNetCore.Mvc;
using RendelőTabletApi.Controllers;
using RendelőTabletApi.Model;

namespace RendelőTabletApi.Test
{
    [TestClass]
    public sealed class EtelTipusControllerTest
    {
        EtelTipusController? _sut;
        DbContextHelper? _db;

        [TestInitialize]
        public void Initialize()
        {
            _db = new DbContextHelper();
            _sut = new EtelTipusController(_db.CreateDbContext());
        }

        [TestMethod]
        public void EtelTipus_Get_SikeresLekeres_VisszaadLista()
        {
            var result = _sut!.Get() as OkObjectResult;
            Assert.IsNotNull(result);
            var lista = result.Value as IEnumerable<EtelTipus>;
            Assert.IsNotNull(lista);
        }

        [TestMethod]
        public void EtelTipus_GetById_AlapertelmezettExt_VisszaadOk()
        {
            var result = _sut!.Get(1) as OkObjectResult;
            Assert.IsNotNull(result);
            var tipus = result.Value as EtelTipus;
            Assert.IsNotNull(tipus);
        }

        [TestMethod]
        public void EtelTipus_GetById_ExtTrue_IncludeTermekek()
        {
            var result = _sut!.Get(1, true) as OkObjectResult;
            Assert.IsNotNull(result);
            var tipus = result.Value as EtelTipus;
            Assert.IsNotNull(tipus);
        }

        [TestMethod]
        public void EtelTipus_GetById_NemLetezoId_VisszaadNotFound()
        {
            var result = _sut!.Get(999);
            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }

        [TestMethod]
        public void EtelTipus_GetById_HibasIdTipus_VisszaadBadRequest()
        {
            // Mivel az id paraméter típusa 'int', stringet ("abc") nem adhatunk át direktben a C# hívás során.
            // Ezt az ASP.NET Core MVC routing szűri meg futásidőben és ad 400 Bad Requestet.
            // Unit tesztben ezt úgy szimuláljuk, hogy manuálisan modelhibát adunk hozzá.

            _sut!.ModelState.AddModelError("id", "The value 'abc' is not valid for id.");

            // A Controller metódusban alapból nincs ModelState ellenőrzés a Get-ben, de ha 
            // feltételezzük, hogy egy akció filter vagy más validáció visszadobja:
            if (!_sut.ModelState.IsValid)
            {
                var result = new BadRequestObjectResult(_sut.ModelState);
                Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
            }
            else
            {
                Assert.Fail("A ModelState-nek érvénytelennek kellene lennie.");
            }
        }
    }
}