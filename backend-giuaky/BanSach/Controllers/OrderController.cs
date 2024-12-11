using BanSach.Models;
using BanSach.Services;
using Microsoft.AspNetCore.Mvc;

namespace BanSach.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController(OrderService orderService) : ControllerBase
    {
        private readonly OrderService _orderService = orderService;

        [HttpGet]
        public async Task<IEnumerable<Order>> GetAsync()
        {
            return await _orderService.GetAsync();
        }

        [HttpGet("{query}")]
        public async Task<Order?> GetOneAsync(string query)
        {
            return await _orderService.GetByIdAsync(query)
                ?? await _orderService.GetByAddressIdAsync(query);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] Order order)
        {
            var result = await _orderService.AddAsync(order);
            // return CreatedAtAction(nameof(GetOneAsync), new { query = order.Id }, order);
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync(string id, [FromBody] Order order)
        {
            await _orderService.UpdateAsync(id, order);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(string id)
        {
            await _orderService.DeleteAsync(id);
            return NoContent();
        }
    }
}
