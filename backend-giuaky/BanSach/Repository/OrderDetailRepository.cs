using BanSach.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using MongoDB.Repository;

namespace BanSach.Repository;

public class OrderDetailRepository(
    BanSachContext context,
    IMongoDbRepositoryOptions<OrderDetail> options,
    IOptions<MongoDbSettings> mongoDbSettings,
    ILogger<OrderDetailRepository> logger
) : CrudRepository<OrderDetail>(context, options, mongoDbSettings, logger), IOrderDetailRepository
{
    public async Task<OrderDetail?> FindByOrderIdAsync(string order_id)
    {
        return await Collection.Find(orderDetail => orderDetail.OrderId == order_id).SingleOrDefaultAsync();
    }

    public async Task<OrderDetail?> SearchByOrderIdAsync(string order_id)
    {
        return await AsQueryable.Where(orderDetail => orderDetail.OrderId == order_id).SingleOrDefaultAsync();
    }
    public async Task<OrderDetail?> FindByProductIdAsync(string product_id)
    {
        return await Collection.Find(orderDetail => orderDetail.ProductId == product_id).SingleOrDefaultAsync();
    }

    public async Task<OrderDetail?> SearchByProductIdAsync(string product_id)
    {
        return await AsQueryable.Where(orderDetail => orderDetail.ProductId == product_id).SingleOrDefaultAsync();
    }
}
