using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BanSach.Models
{
    public class CardDetail : BaseDbModel
    {
        [BsonRepresentation(BsonType.ObjectId)]
       [BsonElement("card_id")]
        [JsonPropertyName("card_id")]
        public string? CardId { get; set; } = null!;

        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("book_id")]
        [JsonPropertyName("book_id")]
        public string? BookId { get; set; } = null!;


        [BsonElement("price")]
        [JsonPropertyName("price")]
        public decimal? Price { get; set; } = null!;

        [BsonElement("quantity")]
        [JsonPropertyName("quantity")]
        public int? Quantity { get; set; } = null!;
       
    }
}
