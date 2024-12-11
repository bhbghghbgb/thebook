using BanSach.Models;
using BanSach.Services;
using Microsoft.AspNetCore.Mvc;

namespace BanSach.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderDetailController(OrderDetailService orderDetailService) : ControllerBase
    {
        private readonly OrderDetailService _orderDetailService = orderDetailService;

        [HttpGet]
        public async Task<IEnumerable<OrderDetail>> GetAsync()
        {
            return await _orderDetailService.GetAsync();
        }

        [HttpGet("{query}")]
        public async Task<OrderDetail?> GetOneAsync(string query)
        {
            return await _orderDetailService.GetByIdAsync(query)
                ?? await _orderDetailService.GetByOrderIdAsync(query)
                ?? await _orderDetailService.GetByProductIdAsync(query);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] OrderDetail orderDetail)
        {
            var result = await _orderDetailService.AddAsync(orderDetail);
            // return CreatedAtAction(nameof(GetOneAsync), new { query = orderDetail.Id }, orderDetail);
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync(string id, [FromBody] OrderDetail orderDetail)
        {
            await _orderDetailService.UpdateAsync(id, orderDetail);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(string id)
        {
            await _orderDetailService.DeleteAsync(id);
            return NoContent();
        }
    }
}
