using THebook.Models.Entities;
using THebook.Repository;

namespace THebook.Services
{
    public class RefCollectionTestService(IRefCollectionTestRepository irctRepository)
    {
        private readonly IRefCollectionTestRepository _irctRepository = irctRepository;

        public async Task CreateOneLevelNest(string documentName, string childrenName)
        {
            await _irctRepository.InsertAsync(
                new NestedCollectionTest
                {
                    Name = documentName,
                    Children = new NestedCollectionTest { Name = childrenName },
                }
            );
        }

        public async Task<IEnumerable<NestedCollectionTest>> Get()
        {
            return await _irctRepository.FindAllAsync();
        }
    }
}
