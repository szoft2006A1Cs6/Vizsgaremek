using BajnoksagApi.Controllers;
using BajnoksagApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mysqlx.Crud;

namespace BajnoksagApi.Test
{
    [TestClass]
    public sealed class PlayerControllerTest
    {
        PlayerController? _sut;
        DbContextHelper? _db;

        [TestInitialize]
        public void Initialize()
        {
            _db = new DbContextHelper();
            var httpContext = new DefaultHttpContext();
            _sut = new PlayerController(_db.CreateDbContext());
            _sut.ControllerContext = new ControllerContext()
            {
                HttpContext = httpContext
            };
        }

        [TestMethod]
        public async Task GetPlayerList_ReturnsOkPlayerList()
        {
            // A 3 "A" szabály: Arrange, Act, Assert

            // 1. Arrange - teszt feltételek elrendezése
            // Ez a teszt nem igényel semmilyen beállítást.

            // 2. Act - teszt futtatása
            var result = await _sut!.ReadPlayerList() as OkObjectResult;


            // 3. Assert - teszt eredmények ellenőrzése
            Assert.IsNotNull(result);
            var playerList = result.Value as IEnumerable<Player>;
            Assert.IsNotNull(playerList);
            foreach (var player in playerList)
            {
                Assert.IsTrue(_db?.PlayerList
                    .Contains(player, new PlayerComparer()));
            }
            Assert.AreEqual(playerList.Count(), _db?.PlayerList.Count);
        }

        [TestMethod]
        public async Task GetPlayerList_ReturnsOkEmptyPlayerList()
        {
            _db?.ClearAll();
            var result = await _sut!.ReadPlayerList() as OkObjectResult;
            Assert.IsNotNull(result);
            var playerList = result.Value as IEnumerable<Player>;
            Assert.IsNotNull(playerList);
            Assert.AreEqual(0, playerList.Count());
        }

        [TestMethod]
        public async Task TestAll_ReturnsOk()
        {
            #region Create
            var newPlayer = new Player
            {
                Name = "Búza Virág",
                Age = 23,
                Position = "Center"
            };
            var created = await _sut!.CreatePlayer(newPlayer) as CreatedResult;
            Assert.IsNotNull(created);
            var player = created.Value as Player;
            Assert.IsNotNull(player);
            #endregion

            #region Update
            player.Name = "Tavi Rózsa";
            player.Age = 21;
            var updated = await _sut!.UpdatePlayer(player.Id, player) as OkObjectResult;
            Assert.IsNotNull(updated);
            player = updated.Value as Player;
            Assert.IsNotNull(player);
            #endregion

            #region Delete
            var deleted = await _sut!.DeletePlayer(player.Id) as OkObjectResult;
            Assert.IsNotNull(deleted);
            player = deleted.Value as Player;
            Assert.IsNotNull(player);
            #endregion
        }
    }
}
