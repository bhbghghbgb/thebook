using BanSach.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using MongoDB.Repository;

namespace BanSach.Repository;

public class OrderRepository(
    BanSachContext context,
    IMongoDbRepositoryOptions<Order> options,
    IOptions<MongoDbSettings> mongoDbSettings,
    ILogger<OrderRepository> logger
) : CrudRepository<Order>(context, options, mongoDbSettings, logger), IOrderRepository
{
    public async Task<Order?> FindByAddressIdAsync(string address_id)
    {
        return await Collection.Find(order => order.AddressId == address_id).SingleOrDefaultAsync();
    }

    public async Task<Order?> SearchByAddressIdAsync(string address_id)
    {
        return await AsQueryable.Where(order => order.AddressId == address_id).SingleOrDefaultAsync();
    }
}
