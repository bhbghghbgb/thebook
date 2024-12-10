using BanSach.Models;
using BanSach.Repository;
using MongoDB.Infrastructure;
using MongoDB.UnitOfWork;

namespace BanSach.Services
{
    public class BookCatalogueService(IMongoDbUnitOfWork<BanSachContext> unitOfWork)
    {
        private readonly IMongoDbUnitOfWork<BanSachContext> Uow = unitOfWork;
        private IBookCatalogueRepository Repo
        {
            get { return Uow.CustomRepository<IBookCatalogueRepository>(); }
        }

        public async Task<IEnumerable<BookCatalogue>> GetAsync()
        {
            return await Repo.SearchAllAsync();
        }

        public async Task<BookCatalogue?> GetByIdAsync(string id)
        {
            return await Repo.SearchByIdAsync(id);
        }

        public async Task<BookCatalogue?> GetByBookIdAsync(string book_id)
        {
            return await Repo.SearchByBookIdAsync(book_id);
        }

        public async Task<IMongoDbSaveChangesResult> AddAsync(BookCatalogue bookCatalogue)
        {
            if (await Repo.AnyAsync(bookCatalogue0 => bookCatalogue0.BookId == bookCatalogue.BookId))
            {
                throw new InvalidOperationException(
                    $"BookCatalogue with BookId '{bookCatalogue.BookId}' already exists"
                );
            }
            bookCatalogue.Id = null;
            await Repo.InsertOneAsync(bookCatalogue);
            return await Uow.SaveChangesAsync();
        }

        public async Task<IMongoDbSaveChangesResult> UpdateAsync(string id, BookCatalogue bookCatalogue)
        {
            await Repo.ReplaceByIdAsync(id, bookCatalogue);
            return await Uow.SaveChangesAsync();
        }

        public async Task<IMongoDbSaveChangesResult> DeleteAsync(string id)
        {
            await Repo.DeleteByIdAsync(id);
            return await Uow.SaveChangesAsync();
        }
    }
}
