using BanSach.Models;
using BanSach.Repository;
using MongoDB.Infrastructure;
using MongoDB.UnitOfWork;

namespace BanSach.Services
{
    public class OrderService(IMongoDbUnitOfWork<BanSachContext> unitOfWork)
    {
        private readonly IMongoDbUnitOfWork<BanSachContext> Uow = unitOfWork;
        private IOrderRepository Repo
        {
            get { return Uow.CustomRepository<IOrderRepository>(); }
        }

        public async Task<IEnumerable<Order>> GetAsync()
        {
            return await Repo.SearchAllAsync();
        }

        public async Task<Order?> GetByIdAsync(string id)
        {
            return await Repo.SearchByIdAsync(id);
        }

        public async Task<Order?> GetByAddressIdAsync(string address_id)
        {
            return await Repo.SearchByAddressIdAsync(address_id);
        }

        public async Task<IMongoDbSaveChangesResult> AddAsync(Order order)
        {
            if (await Repo.AnyAsync(order0 => order0.AddressId == order.AddressId))
            {
                throw new InvalidOperationException(
                    $"Order with AddressId '{order.AddressId}' already exists"
                );
            }
            order.Id = null;
            await Repo.InsertOneAsync(order);
            return await Uow.SaveChangesAsync();
        }

        public async Task<IMongoDbSaveChangesResult> UpdateAsync(string id, Order order)
        {
            await Repo.ReplaceByIdAsync(id, order);
            return await Uow.SaveChangesAsync();
        }

        public async Task<IMongoDbSaveChangesResult> DeleteAsync(string id)
        {
            await Repo.DeleteByIdAsync(id);
            return await Uow.SaveChangesAsync();
        }
    }
}
