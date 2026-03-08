using Microsoft.EntityFrameworkCore;
using UserAPI.Models;

namespace UserAPI.Database
{
    public class UserManagerContext : DbContext
    {
        public DbSet<ApplicationUser> ApplicationUser { get; set; }
        public UserManagerContext(DbContextOptions<UserManagerContext> options)
            : base(options) { }
    }
}
