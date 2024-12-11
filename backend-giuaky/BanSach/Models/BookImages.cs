using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BanSach.Models
{
    public class BookImages : BaseDbModel
    {

        [BsonElement("name")]
        [JsonPropertyName("name")]
        public string? Name { get; set; } = null!;

        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("book_id")]
        [JsonPropertyName("book_id")]
        public string? BookId { get; set; } = null!;
    }
}
