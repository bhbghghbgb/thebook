using BanSach.Models;
using BanSach.Services;
using Microsoft.AspNetCore.Mvc;

namespace BanSach.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookCatalogueController(BookCatalogueService bookCatalogueService) : ControllerBase
    {
        private readonly BookCatalogueService _bookCatalogueService = bookCatalogueService;

        [HttpGet]
        public async Task<IEnumerable<BookCatalogue>> GetAsync()
        {
            return await _bookCatalogueService.GetAsync();
        }

        [HttpGet("{query}")]
        public async Task<BookCatalogue?> GetOneAsync(string query)
        {
            return await _bookCatalogueService.GetByIdAsync(query)
                ?? await _bookCatalogueService.GetByBookIdAsync(query);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] BookCatalogue bookCatalogue)
        {
            var result = await _bookCatalogueService.AddAsync(bookCatalogue);
            // return CreatedAtAction(nameof(GetOneAsync), new { query = bookCatalogue.Id }, bookCatalogue);
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync(string id, [FromBody] BookCatalogue bookCatalogue)
        {
            await _bookCatalogueService.UpdateAsync(id, bookCatalogue);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(string id)
        {
            await _bookCatalogueService.DeleteAsync(id);
            return NoContent();
        }
    }
}
