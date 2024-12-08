using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BanSach.Models
{
    public class Book : BaseDbModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonPropertyName("id")]
        public int? Id { get; set; } = null!;

        [BsonElement("title")]
        [JsonPropertyName("title")]
        public string? Title { get; set; } = null!;

        [BsonElement("author")]
        [JsonPropertyName("author")]
        public string? Author { get; set; } = null!;


        [BsonElement("price")]
        [JsonPropertyName("price")]
        public decimal? Price { get; set; } = null!;

        [BsonElement("available")]
        [JsonPropertyName("available")]
        public bool? Available { get; set; } = null!;

        [BsonElement("is_active")]
        [JsonPropertyName("is_active")]
        public bool? IsActive { get; set; } = null!;

       [BsonElement("publisher")]
        [JsonPropertyName("publisher")]
        public string? Publisher { get; set; } = null!;

        [BsonElement("created_at")]
        [JsonPropertyName("created_at")]
        public DateTime? CreatedAt { get; set; } = null!;

        [BsonElement("genre_id")]
        [JsonPropertyName("genre_id")]
        public int? GenreId { get; set; } = null!;
    }
}
