using BanSach.Models;
using BanSach.Repository;
using MongoDB.Infrastructure;
using MongoDB.UnitOfWork;

namespace BanSach.Services
{
    public class CatalogueService(IMongoDbUnitOfWork<BanSachContext> unitOfWork)
    {
        private readonly IMongoDbUnitOfWork<BanSachContext> Uow = unitOfWork;
        private ICatalogueRepository Repo
        {
            get { return Uow.CustomRepository<ICatalogueRepository>(); }
        }

        public async Task<IEnumerable<Catalogue>> GetAsync()
        {
            return await Repo.SearchAllAsync();
        }

        public async Task<Catalogue?> GetByIdAsync(string id)
        {
            return await Repo.SearchByIdAsync(id);
        }

        public async Task<Catalogue?> GetByTitleAsync(string title)
        {
            return await Repo.SearchByTitleAsync(title);
        }

        public async Task<IMongoDbSaveChangesResult> AddAsync(Catalogue catalogue)
        {
            if (await Repo.AnyAsync(catalogue0 => catalogue0.Title == catalogue.Title))
            {
                throw new InvalidOperationException(
                    $"Catalogue with title '{catalogue.Title}' already exists"
                );
            }
            catalogue.Id = null;
            await Repo.InsertOneAsync(catalogue);
            return await Uow.SaveChangesAsync();
        }

        public async Task<IMongoDbSaveChangesResult> UpdateAsync(string id, Catalogue catalogue)
        {
            await Repo.ReplaceByIdAsync(id, catalogue);
            return await Uow.SaveChangesAsync();
        }

        public async Task<IMongoDbSaveChangesResult> DeleteAsync(string id)
        {
            await Repo.DeleteByIdAsync(id);
            return await Uow.SaveChangesAsync();
        }
    }
}
