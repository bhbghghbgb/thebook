using BanSach.Models;
using BanSach.Repository;
using MongoDB.Infrastructure;
using MongoDB.UnitOfWork;

namespace BanSach.Services
{
    public class BookImagesService(IMongoDbUnitOfWork<BanSachContext> unitOfWork)
    {
        private readonly IMongoDbUnitOfWork<BanSachContext> Uow = unitOfWork;
        private IBookImagesRepository Repo
        {
            get { return Uow.CustomRepository<IBookImagesRepository>(); }
        }

        public async Task<IEnumerable<BookImages>> GetAsync()
        {
            return await Repo.SearchAllAsync();
        }

        public async Task<BookImages?> GetByIdAsync(string id)
        {
            return await Repo.SearchByIdAsync(id);
        }

        public async Task<BookImages?> GetByNameAsync(string name)
        {
            return await Repo.SearchByNameAsync(name);
        }

        public async Task<IMongoDbSaveChangesResult> AddAsync(BookImages bookImages)
        {
            if (await Repo.AnyAsync(bookImages0 => bookImages0.Name == bookImages.Name))
            {
                throw new InvalidOperationException(
                    $"BookImages with name '{bookImages.Name}' already exists"
                );
            }
            bookImages.Id = null;
            await Repo.InsertOneAsync(bookImages);
            return await Uow.SaveChangesAsync();
        }

        public async Task<IMongoDbSaveChangesResult> UpdateAsync(string id, BookImages bookImages)
        {
            await Repo.ReplaceByIdAsync(id, bookImages);
            return await Uow.SaveChangesAsync();
        }

        public async Task<IMongoDbSaveChangesResult> DeleteAsync(string id)
        {
            await Repo.DeleteByIdAsync(id);
            return await Uow.SaveChangesAsync();
        }
    }
}
