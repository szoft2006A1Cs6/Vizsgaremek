namespace RendelőTabletApi.Model
{
    public class EtelTipus
    {
        public int EteltipusId { get; set; }

        public string? TipusNev { get; set; }

        public List<Termek>? Termekek { get; set; }

        public override string ToString()
        {
            return $"{TipusNev}";
        }
    }
}
