using BanSach.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using MongoDB.Repository;

namespace BanSach.Repository;

public class BookImagesRepository(
    BanSachContext context,
    IMongoDbRepositoryOptions<BookImages> options,
    IOptions<MongoDbSettings> mongoDbSettings,
    ILogger<BookImagesRepository> logger
) : CrudRepository<BookImages>(context, options, mongoDbSettings, logger), IBookImagesRepository
{
    public async Task<BookImages?> FindByNameAsync(string name)
    {
        return await Collection.Find(bookImages => bookImages.Name == name).SingleOrDefaultAsync();
    }

    public async Task<BookImages?> SearchByNameAsync(string name)
    {
        return await AsQueryable.Where(bookImages => bookImages.Name == name).SingleOrDefaultAsync();
    }
}
