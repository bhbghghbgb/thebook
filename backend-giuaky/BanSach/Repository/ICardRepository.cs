using BanSach.Models;

namespace BanSach.Repository
{
    public interface ICardRepository : ICrudRepository<Card>
    {
        public Task<Card?> FindByUserIdAsync(string user_id);
        public Task<Card?> SearchByUserIdAsync(string user_id);
    }
}
