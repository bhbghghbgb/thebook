using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BanSach.Models
{
    public class OrderDetail : BaseDbModel
    {
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("order_id")]
        [JsonPropertyName("order_id")]
        public string? OrderId { get; set; } = null!;

        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("product_id")]
        [JsonPropertyName("product_id")]
        public string? ProductId { get; set; } = null!;

       [BsonElement("quantity")]
        [JsonPropertyName("quantity")]
        public int? Quantity { get; set; } = null!;

        [BsonElement("unit_price")]
        [JsonPropertyName("unit_price")]
        public decimal? UnitPrice { get; set; } = null!;

        [BsonElement("is_active")]
        [JsonPropertyName("is_active")]
        public bool? IsActive { get; set; } = null!;
    }
}
