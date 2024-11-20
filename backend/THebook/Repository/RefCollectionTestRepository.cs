using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using THebook.Models.Entities;

namespace THebook.Repository;

public partial class RefCollectionTestRepository(
    ThEbookContext context,
    IOptions<MongoDbSettings> mongoDbSettings,
    ILogger<RefCollectionTestRepository> logger
)
    : CrudRepository<NestedCollectionTest>(context, mongoDbSettings, logger),
        IRefCollectionTestRepository
{
    public new async Task<IEnumerable<NestedCollectionTest>> FindAllAsync()
    {
        // add them 1 field vao object, su dung so sanh objectid de tim
        var lookupStage = new BsonDocument(
            "$lookup",
            new BsonDocument
            {
                { "from", "nested_collection_test" },
                { "localField", "children" },
                { "foreignField", "_id" },
                { "as", "children_object" },
            }
        );
        // vi ket qua field ra la array, dung unwind de thanh 1 phan tu dau tien
        var unwindStage = new BsonDocument(
            "$unwind",
            new BsonDocument
            {
                { "path", "$children_object" },
                { "preserveNullAndEmptyArrays", true },
            }
        );
        var pipeline = new[] { lookupStage, unwindStage };
        return await _collection.Aggregate<NestedCollectionTest>(pipeline).ToListAsync();
    }
}
