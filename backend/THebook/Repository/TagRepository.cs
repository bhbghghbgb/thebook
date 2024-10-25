using MongoDB.Driver;
using THebook.Models.Entities;

namespace THebook.Repository
{
    public class TagRepository : GenericRepository<TagEntity>, ITagRepository
    {
        private readonly MongoDbContext _context;

        public TagRepository(MongoDbContext context)
            : base(context.Tags)
        {
            _context = context;
        }

        public async Task<TagEntity?> FindByNameAsync(string name)
        {
            return await _context.Tags.Find(tag => tag.Name == name.ToLower()).FirstOrDefaultAsync();
        }
    }
}
