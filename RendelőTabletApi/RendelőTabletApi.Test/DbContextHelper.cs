using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using RendelőTabletApi.Model;
using System.Collections.Generic;

namespace RendelőTabletApi.Test
{
    internal class DbContextHelper
    {
        private Context? _context = null;
        public Context Context => _context!;

        public Context CreateDbContext()
        {
            var connection = new SqliteConnection("DataSource=:memory:");
            connection.Open();
            var options = new DbContextOptionsBuilder<Context>()
                .UseSqlite(connection)
                .Options;

            _context = new Context(options);
            _context.Database.EnsureCreated();

            SeedData();

            return _context;
        }

        private void SeedData()
        {
            // Alapadatok feltöltése a tesztekhez
            _context!.Asztalok.AddRange(
                new Asztal { AsztalId = 1, Ferohely = 4 },
                new Asztal { AsztalId = 2, Ferohely = 2 }
            );

            _context.Pincerek.AddRange(
                new Pincer { PincerId = 1 }, // Töltsd ki a hiányzó model propertykkel
                new Pincer { PincerId = 2 }
            );

            _context.EtelTipusok.Add(new EtelTipus { EteltipusId = 1 });

            _context.Termekek.Add(new Termek { TermekId = 1, TermekNev = "Kóla", Ar = 500, EteltipusId = 1 });

            _context.Rendelesek.Add(new Rendeles { RendelesId = 1, AsztalId = 1, PincerId = 1, Statusz = 2 });

            _context.SaveChanges();
        }

        internal void ClearAll()
        {
            _context!.Asztalok.RemoveRange(_context.Asztalok);
            _context.Pincerek.RemoveRange(_context.Pincerek);
            _context.Ertekelesek.RemoveRange(_context.Ertekelesek);
            _context.EtelTipusok.RemoveRange(_context.EtelTipusok);
            _context.Termekek.RemoveRange(_context.Termekek);
            _context.Rendelesek.RemoveRange(_context.Rendelesek);
            _context.RendelesTetelek.RemoveRange(_context.RendelesTetelek);
            _context.SaveChanges();
        }
    }
}