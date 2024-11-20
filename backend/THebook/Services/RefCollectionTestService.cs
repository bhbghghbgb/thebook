using MongoDB.Bson;
using THebook.Models.Entities;
using THebook.Repository;

namespace THebook.Services
{
    public class RefCollectionTestService(IRefCollectionTestRepository irctRepository)
    {
        private readonly IRefCollectionTestRepository _irctRepository = irctRepository;

        public async Task CreateOneLevelNest(string documentName, string childrenName)
        {
            var children = new NestedCollectionTest { Name = childrenName };
            await _irctRepository.InsertAsync(children);
            await _irctRepository.InsertAsync(
                new NestedCollectionTest { Name = documentName, ChildrenId = children.Id }
            );
        }

        public async Task<IEnumerable<NestedCollectionTest>> Get()
        {
            return await _irctRepository.FindAllAsync();
        }
    }
}
