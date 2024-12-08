using BanSach.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using MongoDB.Repository;

namespace BanSach.Repository
{
    public class UserRepository(
        BanSachContext context,
        IMongoDbRepositoryOptions<User> options,
        IOptions<MongoDbSettings> mongoDbSettings,
        ILogger<UserRepository> logger
    ) : CrudRepository<User>(context, options, mongoDbSettings, logger), IUserRepository
    {
        public async Task<User?> FindByNameAsync(string user_name)
        {
            return await Collection.Find(user => user.Username == user_name).SingleOrDefaultAsync();
        }

        public async Task<User?> SearchByNameAsync(string user_name)
        {
            return await AsQueryable.Where(user => user.Username == user_name).SingleOrDefaultAsync();
        }
    }
}
