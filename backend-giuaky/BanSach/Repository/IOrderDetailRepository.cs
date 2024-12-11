using BanSach.Models;

namespace BanSach.Repository
{
    public interface IOrderDetailRepository : ICrudRepository<OrderDetail>
    {
        public Task<OrderDetail?> FindByOrderIdAsync(string order_id);
        public Task<OrderDetail?> SearchByOrderIdAsync(string order_id);
        public Task<OrderDetail?> FindByProductIdAsync(string product_id);
        public Task<OrderDetail?> SearchByProductIdAsync(string product_id);
    }
}
