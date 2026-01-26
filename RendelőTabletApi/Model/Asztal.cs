namespace RendelőTabletApi.Model
{
    public class Asztal
    {
        public int AsztalId { get; set; }
        public int Ferohely { get; set; }

        public List<Rendeles>? Rendelesek { get; set; }

        public override string ToString()
        {
            return $"{AsztalId}. asztal ({Ferohely} fő)";
        }
    }
}
