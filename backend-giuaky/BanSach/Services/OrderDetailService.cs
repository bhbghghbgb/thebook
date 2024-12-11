using BanSach.Models;
using BanSach.Repository;
using MongoDB.Infrastructure;
using MongoDB.UnitOfWork;

namespace BanSach.Services
{
    public class OrderDetailService(IMongoDbUnitOfWork<BanSachContext> unitOfWork)
    {
        private readonly IMongoDbUnitOfWork<BanSachContext> Uow = unitOfWork;
        private IOrderDetailRepository Repo
        {
            get { return Uow.CustomRepository<IOrderDetailRepository>(); }
        }

        public async Task<IEnumerable<OrderDetail>> GetAsync()
        {
            return await Repo.SearchAllAsync();
        }

        public async Task<OrderDetail?> GetByIdAsync(string id)
        {
            return await Repo.SearchByIdAsync(id);
        }

        public async Task<OrderDetail?> GetByOrderIdAsync(string order_id)
        {
            return await Repo.SearchByOrderIdAsync(order_id);
        }
        public async Task<OrderDetail?> GetByProductIdAsync(string product_id)
        {
            return await Repo.SearchByProductIdAsync(product_id);
        }

        public async Task<IMongoDbSaveChangesResult> AddAsync(OrderDetail orderDetail)
        {
            if (await Repo.AnyAsync(orderDetail0 => orderDetail0.OrderId == orderDetail.OrderId))
            {
                throw new InvalidOperationException(
                    $"OrderDetail with OrderId '{orderDetail.OrderId}' already exists"
                );
            }
            if (await Repo.AnyAsync(orderDetail0 => orderDetail0.ProductId == orderDetail.ProductId))
            {
                throw new InvalidOperationException(
                    $"OrderDetail with ProductId '{orderDetail.ProductId}' already exists"
                );
            }
            orderDetail.Id = null;
            await Repo.InsertOneAsync(orderDetail);
            return await Uow.SaveChangesAsync();
        }

        public async Task<IMongoDbSaveChangesResult> UpdateAsync(string id, OrderDetail orderDetail)
        {
            await Repo.ReplaceByIdAsync(id, orderDetail);
            return await Uow.SaveChangesAsync();
        }

        public async Task<IMongoDbSaveChangesResult> DeleteAsync(string id)
        {
            await Repo.DeleteByIdAsync(id);
            return await Uow.SaveChangesAsync();
        }
    }
}
