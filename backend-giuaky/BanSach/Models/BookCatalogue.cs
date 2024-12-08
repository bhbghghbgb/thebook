using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BanSach.Models
{
    public class BookCatalogue : BaseDbModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonPropertyName("id")]
        public int? Id { get; set; } = null!;

        [BsonElement("book_id")]
        [JsonPropertyName("book_id")]
        public int? BookId { get; set; } = null!;

        [BsonElement("catalogue_id")]
        [JsonPropertyName("catalogue_id")]
        public decimal? CatalogueId { get; set; } = null!;

    }
}
