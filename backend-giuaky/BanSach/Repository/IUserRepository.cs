using BanSach.Models;

namespace BanSach.Repository
{
    public interface IUserRepository : ICrudRepository<User>
    {
        public Task<User?> FindByNameAsync(string user_name);
        public Task<User?> SearchByNameAsync(string user_name);
    }
}
