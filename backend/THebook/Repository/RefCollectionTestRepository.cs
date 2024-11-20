using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.UnitOfWork;
using THebook.Models.Entities;

namespace THebook.Repository;

public partial class RefCollectionTestRepository(
    ThEbookContext context,
    IOptions<MongoDbSettings> mongoDbSettings,
    ILogger<RefCollectionTestRepository> logger,
    IMongoDbUnitOfWork<ThEbookContext> unitOfWork
)
    : CrudRepository<NestedCollectionTest>(context, mongoDbSettings, logger),
        IRefCollectionTestRepository
{
    private readonly IMongoDbUnitOfWork<ThEbookContext> _unitOfWork = unitOfWork;

    private IAggregateFluent<NestedCollectionTest> GetDefaultPipeline()
    {
        // MongoDB.Driver.Linq.ExpressionNotSupportedException: Expression not supported: asField.Children.
        // var collectionName = _settings.Value.CollectionNames[nameof(NestedCollectionTest)];
        // return _collection
        //     .Aggregate()
        //     .Lookup<NestedCollectionTest, NestedCollectionTest, NestedCollectionTest>(
        //         _collection,
        //         localField => localField.ChildrenId,
        //         foreignField => foreignField.Id,
        //         asField => asField.Children
        //     )
        //     .Unwind(
        //         field => field.Children,
        //         new AggregateUnwindOptions<NestedCollectionTest>
        //         {
        //             PreserveNullAndEmptyArrays = true,
        //         }
        //     );
        var collectionName = _settings.Value.CollectionNames[nameof(NestedCollectionTest)];
        // add them 1 field vao object, su dung so sanh objectid de tim
        var lookupStage = new BsonDocument(
            "$lookup",
            new BsonDocument
            {
                { "from", collectionName },
                { "localField", NestedCollectionTest.CHILDREN },
                { "foreignField", "_id" },
                { "as", NestedCollectionTest.CHILDREN_OBJ },
            }
        );
        // vi ket qua field ra la array, dung unwind de thanh 1 phan tu dau tien
        var unwindStage = new BsonDocument(
            "$unwind",
            new BsonDocument
            {
                { "path", $"${NestedCollectionTest.CHILDREN_OBJ}" },
                { "preserveNullAndEmptyArrays", true },
            }
        );
        return _collection
            .Aggregate()
            .AppendStage<NestedCollectionTest>(lookupStage)
            .AppendStage<NestedCollectionTest>(unwindStage);
    }

    public new async Task<IEnumerable<NestedCollectionTest>> FindAllAsync()
    {
        return await GetDefaultPipeline().ToListAsync();
    }
}
