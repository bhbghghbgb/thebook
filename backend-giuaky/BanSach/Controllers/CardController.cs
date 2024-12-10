using BanSach.Models;
using BanSach.Services;
using Microsoft.AspNetCore.Mvc;

namespace BanSach.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CardController(CardService cardService) : ControllerBase
    {
        private readonly CardService _cardService = cardService;

        [HttpGet]
        public async Task<IEnumerable<Card>> GetAsync()
        {
            return await _cardService.GetAsync();
        }

        [HttpGet("{query}")]
        public async Task<Card?> GetOneAsync(string query)
        {
            return await _cardService.GetByIdAsync(query)
                ?? await _cardService.GetByUserIdAsync(query);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] Card card)
        {
            var result = await _cardService.AddAsync(card);
            // return CreatedAtAction(nameof(GetOneAsync), new { query = card.Id }, card);
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync(string id, [FromBody] Card card)
        {
            await _cardService.UpdateAsync(id, card);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(string id)
        {
            await _cardService.DeleteAsync(id);
            return NoContent();
        }
    }
}
