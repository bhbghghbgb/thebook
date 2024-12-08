using BanSach.Models;

namespace BanSach.Repository
{
    public interface IBookRepository : ICrudRepository<Book>
    {
        public Task<Book?> FindByTitleAsync(string title);
        public Task<Book?> SearchByTitleAsync(string title);
    }
}