using Microsoft.AspNetCore.Mvc;
using THebook.Services;
using THebook.Models.Entities;

namespace THebook.Controllers.Tag
{
    [ApiController]
    [Route("api/[controller]")]
    public class TagController : ControllerBase
    {
        private readonly TagService _tagService;

        public TagController(TagService tagService)
        {
            _tagService = tagService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTags()
        {
            var tags = await _tagService.GetAllTagsAsync();
            return Ok(tags);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTagById(string id)
        {
            var tag = await _tagService.GetTagByIdAsync(id);
            if (tag == null)
            {
                return NotFound();
            }
            return Ok(tag);
        }

        [HttpPost]
        public async Task<IActionResult> AddTag([FromBody] TagEntity tag)
        {
            if (tag == null)
            {
                return BadRequest("Tag cannot be null");
            }

            await _tagService.AddTagAsync(tag);
            return CreatedAtAction(nameof(GetTagById), new { id = tag.Id }, tag);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTag(string id, [FromBody] TagEntity tag)
        {
            if (tag == null)
            {
                return BadRequest("Tag cannot be null");
            }

            await _tagService.UpdateTagAsync(id, tag);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTag(string id)
        {
            await _tagService.DeleteTagAsync(id);
            return NoContent();
        }
    }
}