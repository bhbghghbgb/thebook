using BanSach.Models;
using BanSach.Services;
using Microsoft.AspNetCore.Mvc;

namespace BanSach.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CatalogueController(CatalogueService catalogueService) : ControllerBase
    {
        private readonly CatalogueService _catalogueService = catalogueService;

        [HttpGet]
        public async Task<IEnumerable<Catalogue>> GetAsync()
        {
            return await _catalogueService.GetAsync();
        }

        [HttpGet("{query}")]
        public async Task<Catalogue?> GetOneAsync(string query)
        {
            return await _catalogueService.GetByIdAsync(query)
                ?? await _catalogueService.GetByTitleAsync(query);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] Catalogue catalogue)
        {
            var result = await _catalogueService.AddAsync(catalogue);
            // return CreatedAtAction(nameof(GetOneAsync), new { query = catalogue.Id }, catalogue);
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync(string id, [FromBody] Catalogue catalogue)
        {
            await _catalogueService.UpdateAsync(id, catalogue);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(string id)
        {
            await _catalogueService.DeleteAsync(id);
            return NoContent();
        }
    }
}
