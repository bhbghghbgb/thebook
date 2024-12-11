using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BanSach.Models
{
    public class Order : BaseDbModel
    {
        [BsonElement("code")]
        [JsonPropertyName("code")]
        public string? Code { get; set; } = null!;

        [BsonElement("created_on")]
        [JsonPropertyName("created_on")]
        public DateTime? CreatedOn { get; set; } = null!;

        [BsonElement("total_amount")]
        [JsonPropertyName("total_amount")]
        public int? TotalAmount { get; set; } = null!;

        [BsonElement("payment_method")]
        [JsonPropertyName("payment_method")]
        public string? PaymentMethod { get; set; } = null!;

        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("address_id")]
        [JsonPropertyName("address_id")]
        public string? AddressId { get; set; } = null!;

        [BsonElement("status")]
        [JsonPropertyName("status")]
        public string? Status { get; set; } = null!;
    }
}
