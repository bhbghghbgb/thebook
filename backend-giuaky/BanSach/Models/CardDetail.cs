using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BanSach.Models
{
    public class CardDetail : BaseDbModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonPropertyName("id")]
        public int? Id { get; set; } = null!;

       [BsonElement("cart_id")]
        [JsonPropertyName("cart_id")]
        public int? CartId { get; set; } = null!;

        [BsonElement("book_id")]
        [JsonPropertyName("book_id")]
        public int? BookId { get; set; } = null!;


        [BsonElement("price")]
        [JsonPropertyName("price")]
        public decimal? Price { get; set; } = null!;

        [BsonElement("quantity")]
        [JsonPropertyName("quantity")]
        public int? Quantity { get; set; } = null!;
       
    }
}
