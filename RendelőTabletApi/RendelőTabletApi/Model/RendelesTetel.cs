namespace RendelőTabletApi.Model
{
    public class RendelesTetel
    {
        public int TetelId { get; set; }
        public int RendelesId { get; set; }
        public int TermekId { get; set; }
        public int Mennyiseg { get; set; }

        public Rendeles? Rendeles { get; set; }
        public Termek? Termek { get; set; }

        public override string ToString()
        {
            return $"{Mennyiseg}x Termék ID: {TermekId}";
        }
    }
}
