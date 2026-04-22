namespace RendelőTabletApi.Model
{
    public class Termek
    {
        public int TermekId { get; set; }
        public int EteltipusId { get; set; }
        public string? TermekNev { get; set; }
        public int Ar { get; set; }
        public string? Allergenek { get; set; }
        public int Featured {get; set; }
        public string? Kep { get; set; }

        public EtelTipus? EtelTipus { get; set; }

        public override string ToString()
        {
            // Opcionális: Ha akarod, a ToString-be is beleteheted az allergéneket
            string allergenSzoveg = string.IsNullOrEmpty(Allergenek) ? "" : $" (Allergének: {Allergenek})";
            return $"{TermekNev} - {Ar} Ft{allergenSzoveg}";
        }
    }
}