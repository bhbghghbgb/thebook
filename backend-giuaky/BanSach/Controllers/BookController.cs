using BanSach.Models;
using BanSach.Services;
using Microsoft.AspNetCore.Mvc;

namespace BanSach.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController(BookService bookService) : ControllerBase
    {
        private readonly BookService _bookService = bookService;

        [HttpGet]
        public async Task<IEnumerable<Book>> GetAsync()
        {
            return await _bookService.GetAsync();
        }

        [HttpGet("{query}")]
        public async Task<Book?> GetOneAsync(string query)
        {
            return await _bookService.GetByIdAsync(query)
                ?? await _bookService.GetByTitleAsync(query);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] Book book)
        {
            var result = await _bookService.AddAsync(book);
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync(string id, [FromBody] Book book)
        {
            await _bookService.UpdateAsync(id, book);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(string id)
        {
            await _bookService.DeleteAsync(id);
            return NoContent();
        }
    }
}
