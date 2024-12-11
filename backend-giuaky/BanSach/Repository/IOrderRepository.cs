using BanSach.Models;

namespace BanSach.Repository
{
    public interface IOrderRepository : ICrudRepository<Order>
    {
        public Task<Order?> FindByAddressIdAsync(string address_id);
        public Task<Order?> SearchByAddressIdAsync(string address_id);
    }
}
