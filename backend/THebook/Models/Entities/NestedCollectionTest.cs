using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace THebook.Models.Entities
{
    public class NestedCollectionTest : BaseDbModel
    {
        [BsonElement("name")]
        [JsonPropertyName("name")]
        public string? Name { get; set; } = null!;

        [BsonElement("children")]
        [JsonIgnore]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? ChildrenId { get; set; } = null!;

        [BsonElement("children_object")]
        [JsonPropertyName("children")]
        public NestedCollectionTest? Children { get; set; } = null!;
    }
}
