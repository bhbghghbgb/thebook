using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BanSach.Models
{
    public class Catalogue : BaseDbModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonPropertyName("id")]
        public int? Id { get; set; } = null!;

        [BsonElement("title")]
        [JsonPropertyName("title")]
        public string? Title { get; set; } = null!;

        [BsonElement("description")]
        [JsonPropertyName("description")]
        public string? Description { get; set; } = null!;

        [BsonElement("is_active")]
        [JsonPropertyName("is_active")]
        public bool? IsActive { get; set; } = null!;

    }
}
