using BanSach.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using MongoDB.Repository;

namespace BanSach.Repository;

public class BookCatalogueRepository(
    BanSachContext context,
    IMongoDbRepositoryOptions<BookCatalogue> options,
    IOptions<MongoDbSettings> mongoDbSettings,
    ILogger<BookCatalogueRepository> logger
) : CrudRepository<BookCatalogue>(context, options, mongoDbSettings, logger), IBookCatalogueRepository
{
    public async Task<BookCatalogue?> FindByBookIdAsync(string book_id)
    {
        return await Collection.Find(book_catalogue => book_catalogue.BookId == book_id).SingleOrDefaultAsync();
    }

    public async Task<BookCatalogue?> SearchByBookIdAsync(string book_id)
    {
        return await AsQueryable.Where(book_catalogue => book_catalogue.BookId == book_id).SingleOrDefaultAsync();
    }
}
