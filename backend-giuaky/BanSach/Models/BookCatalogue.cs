using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BanSach.Models
{
    public class BookCatalogue : BaseDbModel
    {
       
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("book_id")]
        [JsonPropertyName("book_id")]
        public string? BookId { get; set; } = null!;

        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("catalogue_id")]
        [JsonPropertyName("catalogue_id")]
        public string? CatalogueId { get; set; } = null!;

    }
}
