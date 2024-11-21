using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace THebook.Models.Entities;

public class Foo : BaseDbModel
{
    [BsonElement("name")]
    [JsonPropertyName("name")]
    public string? Name { get; set; } = null!;
}

public class Bar : Foo
{
    [BsonElement("foo")]
    [JsonPropertyName("foo")]
    public Foo? Foo { get; set; } = null!;
}

public class BarDb : Foo
{
    [BsonRepresentation(BsonType.ObjectId)]
    [BsonElement("foo")]
    public string? FooId { get; set; } = null!;
}

public class FooBar
{
    [JsonPropertyName("foos")]
    public IEnumerable<Foo>? Foos { get; set; } = null!;

    [JsonPropertyName("bars")]
    public IEnumerable<Bar>? Bars { get; set; } = null!;
}
