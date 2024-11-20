using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace THebook.Models.Entities
{
    public class NestedCollectionTest : BaseDbModel
    {
        public const string CHILDREN = "children";
        public const string CHILDREN_OBJ = "children_object";

        [BsonElement("name")]
        [JsonPropertyName("name")]
        public string? Name { get; set; } = null!;

        [BsonElement(CHILDREN)]
        [JsonIgnore]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? ChildrenId { get; set; } = null!;

        [BsonElement(CHILDREN_OBJ)]
        [JsonPropertyName(CHILDREN)]
        public NestedCollectionTest? Children { get; set; } = null!;
    }
}
