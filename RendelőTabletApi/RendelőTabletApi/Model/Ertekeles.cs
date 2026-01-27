using System.ComponentModel.DataAnnotations;

namespace RendelőTabletApi.Model
{
    public class Ertekeles
    {
        public int ErtekId { get; set; }
        public int RendelesId { get; set; }
        public DateTime Idopont { get; set; }
        public int Pontszam { get; set; }
        public string? Szoveg { get; set; }

        public Rendeles? Rendeles { get; set; }

        public override string ToString()
        {
            return $"Értékelés: {Pontszam}/5 - {Szoveg}";
        }
    }
}
