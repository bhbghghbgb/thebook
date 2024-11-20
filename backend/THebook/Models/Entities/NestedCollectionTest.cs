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

        [BsonElement("description")]
        [JsonPropertyName("description")]
        public NestedCollectionTest? Children { get; set; } = null!;
    }
}
