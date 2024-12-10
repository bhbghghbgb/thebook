using BanSach.Models;
using BanSach.Services;
using Microsoft.AspNetCore.Mvc;

namespace BanSach.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CardDetailController(CardDetailService CardDetailService) : ControllerBase
    {
        private readonly CardDetailService _CardDetailService = CardDetailService;

        [HttpGet]
        public async Task<IEnumerable<CardDetail>> GetAsync()
        {
            return await _CardDetailService.GetAsync();
        }

        [HttpGet("{query}")]
        public async Task<CardDetail?> GetOneAsync(string query)
        {
            return await _CardDetailService.GetByIdAsync(query)
                ?? await _CardDetailService.GetByCardIdAsync(query)
                ?? await _CardDetailService.GetByBookIdAsync(query);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] CardDetail CardDetail)
        {
            var result = await _CardDetailService.AddAsync(CardDetail);
            // return CreatedAtAction(nameof(GetOneAsync), new { query = CardDetail.Id }, CardDetail);
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync(string id, [FromBody] CardDetail CardDetail)
        {
            await _CardDetailService.UpdateAsync(id, CardDetail);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(string id)
        {
            await _CardDetailService.DeleteAsync(id);
            return NoContent();
        }
    }
}
