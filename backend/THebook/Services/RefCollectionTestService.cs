using MongoDB.Bson;
using MongoDB.UnitOfWork;
using THebook.Models.Entities;
using THebook.Repository;

namespace THebook.Services
{
    public class RefCollectionTestService(
        IRefCollectionTestRepository irctRepository,
        IMongoDbUnitOfWork<ThEbookContext> unitOfWork
    )
    {
        private readonly IRefCollectionTestRepository _irctRepository = irctRepository;
        private readonly IMongoDbUnitOfWork<ThEbookContext> _unitOfWork = unitOfWork;

        public async Task CreateOneLevelNestOk(string documentName, string childrenName)
        {
            // dung unit of work de insert 2 cai cung luc
            var repository = _unitOfWork.CustomRepository<IRefCollectionTestRepository>();
            var children = new NestedCollectionTest { Name = childrenName };
            await repository.InsertOneAsync(children);
            await repository.InsertOneAsync(
                new NestedCollectionTest { Name = documentName, ChildrenId = children.Id }
            );
            await _unitOfWork.SaveChangesAsync();
        }

        // test save changes cua unit of work
        public async Task CreateOneLevelNestError(string documentName, string childrenName)
        {
            // dung unit of work de insert 2 cai cung luc
            var repository = _unitOfWork.CustomRepository<IRefCollectionTestRepository>();
            var children = new NestedCollectionTest { Name = childrenName };
            await repository.InsertOneAsync(children);
            await repository.InsertOneAsync(
                new NestedCollectionTest { Name = documentName, ChildrenId = children.Id }
            );
            throw new NotImplementedException(
                "CreateOneLevelNestError always error route. Should not make any database writes."
            );
#pragma warning disable CS0162 // Unreachable code detected
            await _unitOfWork.SaveChangesAsync();
#pragma warning restore CS0162 // Unreachable code detected
        }

        public async Task<IEnumerable<NestedCollectionTest>> Get()
        {
            return await _irctRepository.FindAllAsync();
        }
    }
}
