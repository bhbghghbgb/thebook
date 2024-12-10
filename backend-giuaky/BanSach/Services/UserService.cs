using BanSach.Models;
using BanSach.Repository;
using MongoDB.Infrastructure;
using MongoDB.UnitOfWork;

namespace BanSach.Services
{
    public class UserService(IMongoDbUnitOfWork<BanSachContext> unitOfWork)
    {
        private readonly IMongoDbUnitOfWork<BanSachContext> Uow = unitOfWork;
        private IUserRepository Repo
        {
            get { return Uow.CustomRepository<IUserRepository>(); }
        }

        public async Task<IEnumerable<User>> GetAsync()
        {
            return await Repo.SearchAllAsync();
        }

        public async Task<User?> GetByIdAsync(string id)
        {
            return await Repo.SearchByIdAsync(id);
        }

        public async Task<User?> GetByNameAsync(string user_name)
        {
            return await Repo.SearchByNameAsync(user_name);
        }

        public async Task<IMongoDbSaveChangesResult> AddAsync(User user)
        {
            if (await Repo.AnyAsync(user0 => user0.Username == user.Username))
            {
                throw new InvalidOperationException(
                    $"User with name '{user.Username}' already exists"
                );
            }
            user.Id = null;
            await Repo.InsertOneAsync(user);
            return await Uow.SaveChangesAsync();
        }

        public async Task<IMongoDbSaveChangesResult> UpdateAsync(string id, User user)
        {
            await Repo.ReplaceByIdAsync(id, user);
            return await Uow.SaveChangesAsync();
        }

        public async Task<IMongoDbSaveChangesResult> DeleteAsync(string id)
        {
            await Repo.DeleteByIdAsync(id);
            return await Uow.SaveChangesAsync();
        }
    }
}
