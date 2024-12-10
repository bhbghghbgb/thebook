using BanSach.Models;
using BanSach.Repository;
using MongoDB.Infrastructure;
using MongoDB.UnitOfWork;

namespace BanSach.Services
{
    public class BookService(IMongoDbUnitOfWork<BanSachContext> unitOfWork)
    {
        private readonly IMongoDbUnitOfWork<BanSachContext> Uow = unitOfWork;
        private IBookRepository Repo
        {
            get { return Uow.CustomRepository<IBookRepository>(); }
        }

        public async Task<IEnumerable<Book>> GetAsync()
        {
            return await Repo.SearchAllAsync();
        }

        public async Task<Book?> GetByIdAsync(string id)
        {
            return await Repo.SearchByIdAsync(id);
        }

        public async Task<Book?> GetByTitleAsync(string name)
        {
            return await Repo.SearchByTitleAsync(name);
        }

        public async Task<IMongoDbSaveChangesResult> AddAsync(Book book)
        {
            if (await Repo.AnyAsync(book0 => book0.Title == book.Title))
            {
                throw new InvalidOperationException(
                    $"Book with title '{book.Title}' already exists"
                );
            }
            book.Id = null;
            await Repo.InsertOneAsync(book);
            return await Uow.SaveChangesAsync();
        }

        public async Task<IMongoDbSaveChangesResult> UpdateAsync(string id, Book book)
        {
            await Repo.ReplaceByIdAsync(id, book);
            return await Uow.SaveChangesAsync();
        }

        public async Task<IMongoDbSaveChangesResult> DeleteAsync(string id)
        {
            await Repo.DeleteByIdAsync(id);
            return await Uow.SaveChangesAsync();
        }
    }
}
