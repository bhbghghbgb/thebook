using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BanSach.Models
{
    public class Card : BaseDbModel
    {
         [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonPropertyName("id")]
        public int? Id { get; set; } = null!;

        [BsonElement("user_id")]
        [JsonPropertyName("user_id")]
        public int? UserId { get; set; } = null!;

        [BsonElement("total_price")]
        [JsonPropertyName("total_price")]
        public decimal? TotalPrice { get; set; } = null!;

        [BsonElement("status")]
        [JsonPropertyName("status")]
        public string? Status { get; set; } = null!;

        [BsonElement("created_at")]
        [JsonPropertyName("created_at")]
        public DateTime? CreatedAt { get; set; } = null!;
       
    }
}
