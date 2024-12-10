using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BanSach.Models
{
    public class Card : BaseDbModel
    {
        
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("user_id")]
        [JsonPropertyName("user_id")]
        public string? UserId { get; set; } = null!;

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
