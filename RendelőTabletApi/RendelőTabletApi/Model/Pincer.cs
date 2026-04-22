namespace RendelőTabletApi.Model
{
    public class Pincer
    {
        public int PincerId { get; set; }
        public string? PincerNev { get; set; }
        public int Munka {get; set; }

        public List<Rendeles>? Rendelesek { get; set; }

        public override string ToString()
        {
            return $"{PincerId}: {PincerNev}";
        }
    }
}
