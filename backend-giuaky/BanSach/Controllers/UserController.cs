using BanSach.Models;
using BanSach.Services;
using Microsoft.AspNetCore.Mvc;

namespace BanSach.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    
    public class UserController(UserService userService) : ControllerBase
    {
        private readonly UserService _userService = userService;

        [HttpGet]
         public async Task<IEnumerable<User>> GetAsync()
        {
            return await userService.GetAsync();
        }

         [HttpGet("{query}")]
        public async Task<User?> GetOneAsync(string query)
        {
            return await _userService.GetByIdAsync(query)
                ?? await _userService.GetByNameAsync(query);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] User user)
        {
            var result = await _userService.AddAsync(user);
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync(string id, [FromBody] User user)
        {
            await _userService.UpdateAsync(id, user);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(string id)
        {
            await _userService.DeleteAsync(id);
            return NoContent();
        }

    }
}
