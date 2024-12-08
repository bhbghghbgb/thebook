using BanSach.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using MongoDB.Repository;

namespace BanSach.Repository;

public class BookRepository(
    BanSachContext context,
    IMongoDbRepositoryOptions<Book> options,
    IOptions<MongoDbSettings> mongoDbSettings,
    ILogger<BookRepository> logger
) : CrudRepository<Book>(context, options, mongoDbSettings, logger), IBookRepository
{
    public async Task<Book?> FindByTitleAsync(string title)
    {
        return await Collection.Find(book => book.Title == title).SingleOrDefaultAsync();
    }

    public async Task<Book?> SearchByTitleAsync(string title)
    {
        return await AsQueryable.Where(book => book.Title == title).SingleOrDefaultAsync();
    }
}
