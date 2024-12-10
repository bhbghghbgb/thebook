using BanSach.Models;
using BanSach.Repository;
using MongoDB.Infrastructure;
using MongoDB.UnitOfWork;

namespace BanSach.Services
{
    public class CardDetailService(IMongoDbUnitOfWork<BanSachContext> unitOfWork)
    {
        private readonly IMongoDbUnitOfWork<BanSachContext> Uow = unitOfWork;
        private ICardDetailRepository Repo
        {
            get { return Uow.CustomRepository<ICardDetailRepository>(); }
        }

        public async Task<IEnumerable<CardDetail>> GetAsync()
        {
            return await Repo.SearchAllAsync();
        }

        public async Task<CardDetail?> GetByIdAsync(string id)
        {
            return await Repo.SearchByIdAsync(id);
        }

        public async Task<CardDetail?> GetByCardIdAsync(string card_id)
        {
            return await Repo.SearchByCardIdAsync(card_id);
        }

        public async Task<CardDetail?> GetByBookIdAsync(string book_id)
        {
            return await Repo.SearchByBookIdAsync(book_id);
        }

        public async Task<IMongoDbSaveChangesResult> AddAsync(CardDetail cardDetail)
        {
            if (await Repo.AnyAsync(cardDetail0 => cardDetail0.CardId == cardDetail.CardId))
            {
                throw new InvalidOperationException(
                    $"CardDetail with CardId '{cardDetail.CardId}' already exists"
                );
            }
            cardDetail.Id = null;
            await Repo.InsertOneAsync(cardDetail);
            return await Uow.SaveChangesAsync();
        }

        public async Task<IMongoDbSaveChangesResult> UpdateAsync(string id, CardDetail cardDetail)
        {
            await Repo.ReplaceByIdAsync(id, cardDetail);
            return await Uow.SaveChangesAsync();
        }

        public async Task<IMongoDbSaveChangesResult> DeleteAsync(string id)
        {
            await Repo.DeleteByIdAsync(id);
            return await Uow.SaveChangesAsync();
        }
    }
}
