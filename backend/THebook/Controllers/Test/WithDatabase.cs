using Microsoft.AspNetCore.Mvc;
using THebook.Models.Entities;
using THebook.Services;

namespace THebook.Controllers.Test
{
    [ApiController]
    [Route("test/db")]
    public class WithDatabase(RefCollectionTestService rctService) : ControllerBase
    {
        private readonly RefCollectionTestService _rctService = rctService;

        [HttpGet]
        [Route("tag")]
        [Route("tags")]
        public IDictionary<string, string> GetTags()
        {
            return new Dictionary<string, string> { { "Hello", "World" } };
        }

        [HttpGet]
        [Route("nest")]
        public async Task<IEnumerable<NestedCollectionTest>> GetNestTest()
        {
            return await _rctService.Get();
        }

        [HttpPut]
        [Route("nest")]
        public async Task PutNestTest(
            string documentName,
            string childrenName,
            bool error = false
        )
        {
            if (error)
                await _rctService.CreateOneLevelNestError(documentName, childrenName);
            else
                await _rctService.CreateOneLevelNestOk(documentName, childrenName);
        }
    }
}
