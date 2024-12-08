using BanSach.Models;

namespace BanSach.Repository
{
    public interface ICatalogueRepository : ICrudRepository<Catalogue>
    {
        public Task<Catalogue?> FindByTitleAsync(string title);
        public Task<Catalogue?> SearchByTitleAsync(string title);
    }
}
