using BanSach.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using MongoDB.Repository;

namespace BanSach.Repository;

public class CardRepository(
    BanSachContext context,
    IMongoDbRepositoryOptions<Card> options,
    IOptions<MongoDbSettings> mongoDbSettings,
    ILogger<CardRepository> logger
) : CrudRepository<Card>(context, options, mongoDbSettings, logger), ICardRepository
{
    public async Task<Card?> FindByUserIdAsync(string user_id)
    {
        return await Collection.Find(card => card.UserId == user_id).SingleOrDefaultAsync();
    }

    public async Task<Card?> SearchByUserIdAsync(string user_id)
    {
        return await AsQueryable.Where(card => card.UserId == user_id).SingleOrDefaultAsync();
    }
}
