using BanSach.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using MongoDB.Repository;

namespace BanSach.Repository;

public class CatalogueRepository(
    BanSachContext context,
    IMongoDbRepositoryOptions<Catalogue> options,
    IOptions<MongoDbSettings> mongoDbSettings,
    ILogger<CatalogueRepository> logger
) : CrudRepository<Catalogue>(context, options, mongoDbSettings, logger), ICatalogueRepository
{
    public async Task<Catalogue?> FindByTitleAsync(string title)
    {
        return await Collection.Find(catalogue => catalogue.Title == title).SingleOrDefaultAsync();
    }

    public async Task<Catalogue?> SearchByTitleAsync(string title)
    {
        return await AsQueryable.Where(catalogue => catalogue.Title == title).SingleOrDefaultAsync();
    }
}
