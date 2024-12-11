using BanSach.Models;
using BanSach.Services;
using Microsoft.AspNetCore.Mvc;

namespace BanSach.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookImagesController(BookImagesService bookImagesService) : ControllerBase
    {
        private readonly BookImagesService _bookImagesService = bookImagesService;

        [HttpGet]
        public async Task<IEnumerable<BookImages>> GetAsync()
        {
            return await _bookImagesService.GetAsync();
        }

        [HttpGet("{query}")]
        public async Task<BookImages?> GetOneAsync(string query)
        {
            return await _bookImagesService.GetByIdAsync(query)
                ?? await _bookImagesService.GetByNameAsync(query);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] BookImages bookImages)
        {
            var result = await _bookImagesService.AddAsync(bookImages);
            // return CreatedAtAction(nameof(GetOneAsync), new { query = bookImages.Id }, bookImages);
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync(string id, [FromBody] BookImages bookImages)
        {
            await _bookImagesService.UpdateAsync(id, bookImages);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(string id)
        {
            await _bookImagesService.DeleteAsync(id);
            return NoContent();
        }
    }
}
