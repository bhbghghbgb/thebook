using BanSach.Models;

namespace BanSach.Repository
{
    public interface IBookCatalogueRepository : ICrudRepository<BookCatalogue>
    {
        public Task<BookCatalogue?> FindByBookIdAsync(string book_id);
        public Task<BookCatalogue?> SearchByBookIdAsync(string book_id);
    }
}
