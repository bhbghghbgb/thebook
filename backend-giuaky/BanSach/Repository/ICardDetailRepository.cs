using BanSach.Models;

namespace BanSach.Repository
{
    public interface ICardDetailRepository : ICrudRepository<CardDetail>
    {
        public Task<CardDetail?> FindByCardIdAsync(string card_id);
        public Task<CardDetail?> SearchByCardIdAsync(string card_id);
        public Task<CardDetail?> FindByBookIdAsync(string book_id);
        public Task<CardDetail?> SearchByBookIdAsync(string book_id);
    }
}
