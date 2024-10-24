using System.Linq.Expressions;
using MongoDB.Bson;
using MongoDB.Driver;
using THebook.Models;
using THebook.Repository;

namespace THebook.Services;

/**
 *
 *
 * Các bước thực hiện:
 * 1. Tạo một class BookService trong thư mục Services
 * 2. BookService sẽ có một constructor nhận một tham số kiểu IOptions<MongoDBSettings> và một tham số kiểu MongoDBService
 * MongoDbSettings sẽ chứa thông tin cấu hình của MongoDB, trong khi MongoDBService sẽ cung cấp các biến Database để thao tác với MongoDB
 * 3. Trong constructor, tạo một thể hiện của MongoClient và sử dụng nó để lấy thể hiện của IMongoDatabase
 *
 */


public class BookService(IMongoDBSettings mongoDbSettings, MongoDBService mongoDbService)
{
    private readonly IMongoCollection<BookDb> _bookCollection =
        mongoDbService.Database.GetCollection<BookDb>(mongoDbSettings.CollectionNames[" "]);

    public async Task<List<BookDb>> GetAsync()
    {
        return await _bookCollection.Find(new BsonDocument()).ToListAsync();
    }

    public async Task<BookDb> GetAsync(string id)
    {
        return await _bookCollection.Find(book => book.Id == id).FirstOrDefaultAsync();
    }

    public async Task<BookDb> CreateAsync(BookDb book)
    {
        await _bookCollection.InsertOneAsync(book);
        return book;
    }

    public async Task UpdateAsync(string id, BookDb bookIn)
    {
        await _bookCollection.ReplaceOneAsync(book => book.Id == id, bookIn);
    }

    public async Task RemoveAsync(BookDb bookIn)
    {
        await _bookCollection.DeleteOneAsync(book => book.Id == bookIn.Id);
    }

    public async Task RemoveAsync(string id)
    {
        await _bookCollection.DeleteOneAsync(book => book.Id == id);
    }

    public async Task<List<BookDb>> GetAsync(Expression<Func<BookDb, bool>> filter)
    {
        return await _bookCollection.Find(filter).ToListAsync();
    }
}
