namespace RendelőTabletApi.Model
{
    public class Termek
    {
        public int TermekId { get; set; }
        public int EteltipusId { get; set; }
        public string? TermekNev { get; set; }
        public int Ar { get; set; }

        public EtelTipus? EtelTipus { get; set; }

        public override string ToString()
        {
            return $"{TermekNev} - {Ar} Ft";
        }
    }
}
