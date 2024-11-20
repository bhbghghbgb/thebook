using Microsoft.Extensions.Options;
using THebook.Models.Entities;

namespace THebook.Repository;

public partial class RefCollectionTestRepository(
    ThEbookContext context,
    IOptions<MongoDbSettings> mongoDbSettings,
    ILogger<RefCollectionTestRepository> logger
) : CrudRepository<NestedCollectionTest>(context, mongoDbSettings, logger), IRefCollectionTestRepository { }
