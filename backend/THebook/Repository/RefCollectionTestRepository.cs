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
        // Define the lookup stage
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
        var pipeline = new[] { lookupStage };
        return await _collection.Aggregate<NestedCollectionTest>(pipeline).ToListAsync();
    }
}
