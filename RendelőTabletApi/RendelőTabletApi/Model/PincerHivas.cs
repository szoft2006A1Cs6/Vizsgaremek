namespace RendelőTabletApi.Model
{
    public class PincerHivas
    {
        public int HivasId { get; set; }
        public int AsztalId { get; set; }
        public DateTime Idopont { get; set; }

        // Mivel átírtuk az adatbázisban TEXT-re, itt is string lesz
        public string Statusz { get; set; } = string.Empty;

        // Navigációs tulajdonság
        public Asztal? Asztal { get; set; }

        public override string ToString()
        {
            return $"Hívás #{HivasId} - Asztal: {AsztalId} ({Idopont:yyyy.MM.dd HH:mm}) - Állapot: {Statusz}";
        }
    }
}
