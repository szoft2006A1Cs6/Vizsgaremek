using Microsoft.AspNetCore.Components.RenderTree;
using Microsoft.EntityFrameworkCore;
using RendelőTabletApi.Model;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace RendelőTabletApi.Model
{
    public class Context : DbContext
    {
        public DbSet<Asztal> Asztalok { get; set; }
        public DbSet<Pincer> Pincerek { get; set; }
        public DbSet<EtelTipus> EtelTipusok { get; set; }
        public DbSet<Termek> Termekek { get; set; }
        public DbSet<Rendeles> Rendelesek { get; set; }
        public DbSet<RendelesTetel> RendelesTetelek { get; set; }
        public DbSet<Ertekeles> Ertekelesek { get; set; }

        public Context(DbContextOptions<Context> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Asztal
            modelBuilder.Entity<Asztal>().ToTable("asztal");
            modelBuilder.Entity<Asztal>().HasKey(a => a.AsztalId);
            modelBuilder.Entity<Asztal>().Property(a => a.AsztalId).HasColumnName("asztal_id");

            // Pincer
            modelBuilder.Entity<Pincer>().ToTable("pincer");
            modelBuilder.Entity<Pincer>().HasKey(p => p.PincerId);
            modelBuilder.Entity<Pincer>().Property(p => p.PincerId).HasColumnName("pincer_id");
            modelBuilder.Entity<Pincer>().Property(p => p.PincerNev).HasColumnName("pincer_nev");

            // EtelTipus
            modelBuilder.Entity<EtelTipus>().ToTable("etel_tipus");
            modelBuilder.Entity<EtelTipus>().HasKey(et => et.EteltipusId);
            modelBuilder.Entity<EtelTipus>().Property(et => et.EteltipusId).HasColumnName("eteltipus_id");
            modelBuilder.Entity<EtelTipus>().Property(et => et.TipusNev).HasColumnName("tipus_nev");

            // Termek
            modelBuilder.Entity<Termek>().ToTable("termek");
            modelBuilder.Entity<Termek>().HasKey(t => t.TermekId);
            modelBuilder.Entity<Termek>().Property(t => t.TermekId).HasColumnName("termek_id");
            modelBuilder.Entity<Termek>().Property(t => t.EteltipusId).HasColumnName("eteltipus_id");
            modelBuilder.Entity<Termek>().Property(t => t.TermekNev).HasColumnName("termek_nev");

            // Rendeles
            modelBuilder.Entity<Rendeles>().ToTable("rendeles");
            modelBuilder.Entity<Rendeles>().HasKey(r => r.RendelesId);
            modelBuilder.Entity<Rendeles>().Property(r => r.RendelesId).HasColumnName("rendeles_id");
            modelBuilder.Entity<Rendeles>().Property(r => r.PincerId).HasColumnName("pincer_id");
            modelBuilder.Entity<Rendeles>().Property(r => r.AsztalId).HasColumnName("asztal_id");

            // RendelesTetel
            modelBuilder.Entity<RendelesTetel>().ToTable("rendeles_tetel");
            modelBuilder.Entity<RendelesTetel>().HasKey(rt => rt.TetelId);
            modelBuilder.Entity<RendelesTetel>().Property(rt => rt.TetelId).HasColumnName("tetel_id");
            modelBuilder.Entity<RendelesTetel>().Property(rt => rt.RendelesId).HasColumnName("rendeles_id");
            modelBuilder.Entity<RendelesTetel>().Property(rt => rt.TermekId).HasColumnName("termek_id");

            // Ertekeles
            modelBuilder.Entity<Ertekeles>().ToTable("ertekeles");
            modelBuilder.Entity<Ertekeles>().HasKey(e => e.ErtekId);
            modelBuilder.Entity<Ertekeles>().Property(e => e.ErtekId).HasColumnName("ertek_id");
            modelBuilder.Entity<Ertekeles>().Property(e => e.RendelesId).HasColumnName("rendeles_id");


            modelBuilder.Entity<Termek>()
                .HasOne(t => t.EtelTipus)
                .WithMany(et => et.Termekek)
                .HasForeignKey(t => t.EteltipusId);

            modelBuilder.Entity<Rendeles>()
                .HasOne(r => r.Pincer)
                .WithMany(p => p.Rendelesek)
                .HasForeignKey(r => r.PincerId);

            modelBuilder.Entity<Rendeles>()
                .HasOne(r => r.Asztal)
                .WithMany(a => a.Rendelesek)
                .HasForeignKey(r => r.AsztalId);

            modelBuilder.Entity<RendelesTetel>()
                .HasOne(rt => rt.Rendeles)
                .WithMany(r => r.RendelesTetelek)
                .HasForeignKey(rt => rt.RendelesId);

            modelBuilder.Entity<RendelesTetel>()
                .HasOne(rt => rt.Termek)
                .WithMany() 
                .HasForeignKey(rt => rt.TermekId);

            modelBuilder.Entity<Ertekeles>()
                .HasOne(e => e.Rendeles)
                .WithOne(r => r.Ertekeles)
                .HasForeignKey<Ertekeles>(e => e.RendelesId);
        }
    }
}
