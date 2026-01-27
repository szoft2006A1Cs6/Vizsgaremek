namespace RendelőTabletApi.Model
{
    public class Rendeles
    {
        public int RendelesId { get; set; }
        public int PincerId { get; set; }
        public int AsztalId { get; set; }
        public DateTime Idopont { get; set; }
        public int Statusz { get; set; }

        public Pincer? Pincer { get; set; }
        public Asztal? Asztal { get; set; }
        public List<RendelesTetel>? RendelesTetelek { get; set; }
        public Ertekeles? Ertekeles { get; set; }

        public override string ToString()
        {
            return $"Rendelés #{RendelesId} - Asztal: {AsztalId} ({Idopont:yyyy.MM.dd HH:mm})";
        }
    }
}
