using System.ComponentModel.DataAnnotations.Schema;

namespace UserAPI.Models
{
    public class ApplicationUser
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Role { get; set; }
        [Column("passwd_hash")]
        public byte[]? PasswdHash { get; set; }
        [Column("passwd_salt")]
        public byte[]? PasswdSalt { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? Gender { get; set; }
    }
}
