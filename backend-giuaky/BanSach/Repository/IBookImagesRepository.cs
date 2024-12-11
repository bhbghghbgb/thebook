using BanSach.Models;

namespace BanSach.Repository
{
    public interface IBookImagesRepository : ICrudRepository<BookImages>
    {
        public Task<BookImages?> FindByNameAsync(string name);
        public Task<BookImages?> SearchByNameAsync(string name);
    }
}
