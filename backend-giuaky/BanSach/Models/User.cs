using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BanSach.Models
{
    public class User : BaseDbModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonPropertyName("id")]
        public int? Id { get; set; } = null!;

        [BsonElement("user_name")]
        [JsonPropertyName("user_name")]
        public string? Username { get; set; } = null!;

        [BsonElement("phone_number")]
        [JsonPropertyName("phone_number")]
        public string? Phonenumber { get; set; } = null!;

        [BsonElement("email")]
        [JsonPropertyName("email")]
        public string? Email { get; set; } = null!;

        [BsonElement("address")]
        [JsonPropertyName("address")]
        public string? Address { get; set; } = null!;
    }
}
