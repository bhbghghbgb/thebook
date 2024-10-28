using Microsoft.AspNetCore.Mvc;
using MangaDexApi.Models;

namespace THebookApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpPost("register")]
        public IActionResult Register([FromBody] UserRegistrationModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            return Ok(new { message = "Registration successful" });
        }
    }
}
