using BanSach.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using MongoDB.Repository;

namespace BanSach.Repository;

public class CardDetailRepository(
    BanSachContext context,
    IMongoDbRepositoryOptions<CardDetail> options,
    IOptions<MongoDbSettings> mongoDbSettings,
    ILogger<CardDetailRepository> logger
) : CrudRepository<CardDetail>(context, options, mongoDbSettings, logger), ICardDetailRepository
{
    public async Task<CardDetail?> FindByCardIdAsync(string card_id)
    {
        return await Collection.Find(card_detail => card_detail.CardId == card_id).SingleOrDefaultAsync();
    }

    public async Task<CardDetail?> SearchByCardIdAsync(string card_id)
    {
        return await AsQueryable.Where(card_detail => card_detail.CardId == card_id).SingleOrDefaultAsync();
    }
    public async Task<CardDetail?> FindByBookIdAsync(string book_id)
    {
        return await Collection.Find(card_detail => card_detail.BookId == book_id).SingleOrDefaultAsync();
    }

    public async Task<CardDetail?> SearchByBookIdAsync(string book_id)
    {
        return await AsQueryable.Where(card_detail => card_detail.BookId == book_id).SingleOrDefaultAsync();
    }
}
