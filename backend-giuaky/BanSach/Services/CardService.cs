using BanSach.Models;
using BanSach.Repository;
using MongoDB.Infrastructure;
using MongoDB.UnitOfWork;

namespace BanSach.Services
{
    public class CardService(IMongoDbUnitOfWork<BanSachContext> unitOfWork)
    {
        private readonly IMongoDbUnitOfWork<BanSachContext> Uow = unitOfWork;
        private ICardRepository Repo
        {
            get { return Uow.CustomRepository<ICardRepository>(); }
        }

        public async Task<IEnumerable<Card>> GetAsync()
        {
            return await Repo.SearchAllAsync();
        }

        public async Task<Card?> GetByIdAsync(string id)
        {
            return await Repo.SearchByIdAsync(id);
        }

        public async Task<Card?> GetByUserIdAsync(string user_id)
        {
            return await Repo.SearchByUserIdAsync(user_id);
        }

        public async Task<IMongoDbSaveChangesResult> AddAsync(Card card)
        {
            if (await Repo.AnyAsync(card0 => card0.UserId == card.UserId))
            {
                throw new InvalidOperationException(
                    $"Card with UserId '{card.UserId}' already exists"
                );
            }
            card.Id = null;
            await Repo.InsertOneAsync(card);
            return await Uow.SaveChangesAsync();
        }

        public async Task<IMongoDbSaveChangesResult> UpdateAsync(string id, Card card)
        {
            await Repo.ReplaceByIdAsync(id, card);
            return await Uow.SaveChangesAsync();
        }

        public async Task<IMongoDbSaveChangesResult> DeleteAsync(string id)
        {
            await Repo.DeleteByIdAsync(id);
            return await Uow.SaveChangesAsync();
        }
    }
}
