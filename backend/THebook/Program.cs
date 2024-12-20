using System.Text.Json.Serialization;
using AutoWrapper;
using FluentValidation;
using Microsoft.AspNetCore.HttpLogging;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.Core.Configuration;
using MongoDB.Infrastructure;
using MongoDB.Infrastructure.Extensions;
using MongoDB.Repository;
using MongoDB.UnitOfWork.Abstractions.Extensions;
using SharpGrip.FluentValidation.AutoValidation.Mvc.Enums;
using SharpGrip.FluentValidation.AutoValidation.Mvc.Extensions;
using THebook.Infrastructure;
using THebook.Models.Queries;
using THebook.Models.Tests;
using THebook.Repository;
using THebook.Repository.Tests;
using THebook.Services;
using THebook.Services.Tests;

var builder = WebApplication.CreateBuilder(args);

// Enable HTTP logging
builder.Services.AddHttpLogging(logging =>
{
    logging.LoggingFields =
        HttpLoggingFields.RequestMethod
        | HttpLoggingFields.RequestPath
        | HttpLoggingFields.ResponseStatusCode;
    logging.CombineLogs = true;
});

// Add MongoDB auto enum conversion to string
var pack = new ConventionPack { new EnumRepresentationConvention(BsonType.String) };
ConventionRegistry.Register("EnumStringConvention", pack, t => true);

// Lấy thông tin cấu hình từ tệp appsettings.json và đăng ký các dịch vụ cần thiết cho Dependency Injection.
builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDB"));
builder.Services.AddSingleton<IMongoDbSettings>(sp =>
    sp.GetRequiredService<IOptions<MongoDbSettings>>().Value
);

// Add services to the container.

// h chua xai, TODO: xem lai xem co xai dc k
// builder.Services.AddDbContext<MongoDbContextEf>();

// builder.Services.AddSingleton<MongoDbCollection>();
// builder.Services.AddScoped(typeof(ICrudRepository<>), typeof(CrudRepository<>));
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IFooRepository, FooRepository>();
builder.Services.AddScoped<IFooBarRepository, FooBarRepository>();
builder.Services.AddScoped<IBookTestRepository, BookTestRepository>();
builder.Services.AddScoped<FooBarService>();
builder.Services.AddScoped<BookTestService>();
builder.Services.AddScoped<CategoryService>(); // Change from AddSingleton to AddScoped

// Thêm dòng này để cấu hình logging
builder.Services.AddLogging();

builder
    .Services.AddControllers(options =>
    {
        // options.Filters.Add<GlobalExceptionFilter>();
    })
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

builder.Services.AddFluentValidationAutoValidation(configuration =>
{
    // Disable the built-in .NET model (data annotations) validation.
    configuration.DisableBuiltInModelValidation = false;
    // Only validate controllers decorated with the `FluentValidationAutoValidation` attribute.
    configuration.ValidationStrategy = ValidationStrategy.Annotations;
    // Enable validation for parameters bound from `BindingSource.Body` binding sources.
    configuration.EnableBodyBindingSourceAutomaticValidation = true;
    // Enable validation for parameters bound from `BindingSource.Form` binding sources.
    configuration.EnableFormBindingSourceAutomaticValidation = true;
    // Enable validation for parameters bound from `BindingSource.Query` binding sources.
    configuration.EnableQueryBindingSourceAutomaticValidation = true;
    // Enable validation for parameters bound from `BindingSource.Path` binding sources.
    configuration.EnablePathBindingSourceAutomaticValidation = false;
    // Enable validation for parameters bound from 'BindingSource.Custom' binding sources.
    configuration.EnableCustomBindingSourceAutomaticValidation = false;
    // Replace the default result factory with a custom implementation.
    // configuration.OverrideDefaultResultFactoryWith<CustomResultFactory>();
});

// To disable the automatic model state validation returning 400
builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});

// FluentValidation can be used within ASP.NET Core web applications to validate incoming models
builder.Services.AddTransient<IValidator<string>, ObjectIdValidator>();
builder.Services.AddTransient<
    IValidator<CategoryRequestCriteria>,
    QueryCategoryCriteriaValidator
>();
builder.Services.AddTransient<IValidator<CategoryRequest>, CategoryRequestObjectValidator>();

var databaseName = builder.Configuration.GetSection("MongoDB:DatabaseName")?.Get<string>();
var connectionString = builder.Configuration.GetSection("MongoDB:ConnectionString")?.Get<string>();
var databaseSettings = builder
    .Configuration.GetSection("MongoDB:DatabaseSettings")
    ?.Get<MongoDatabaseSettings>();
var clientSettings = MongoClientSettings.FromConnectionString(connectionString);
clientSettings.LoggingSettings = new LoggingSettings(
    LoggerFactory.Create(loggingBuilder =>
        loggingBuilder.AddConfiguration(builder.Configuration.GetSection("Logging")).AddConsole()
    ),
    builder.Configuration.GetSection("MongoDB:LoggingMaxDocumentSize").Get<int>()
);
var collectionNames = builder
    .Configuration.GetSection("MongoDB:CollectionNames")
    ?.Get<IDictionary<string, string>>()!;

// Register the DbContext
builder.Services.AddMongoDbContext<IMongoDbContext, ThEbookContext>(
    clientSettings,
    databaseName,
    databaseSettings,
    fluentConfigurationOptions: new MongoDbFluentConfigurationOptions
    {
        ScanningAssemblies = [typeof(ThEbookContext).Assembly],
    }
);

// Register the UnitOfWork
builder.Services.AddMongoDbUnitOfWork<ThEbookContext>();

// https://github.com/ffernandolima/mongo-db-data-access/issues/16
// them options vao DI de trong Repository co the lay duoc collection name
builder.Services.AddSingleton<IMongoDbRepositoryOptions<BookTest>>(
    provider => new MongoDbRepositoryOptions<BookTest>
    {
        CollectionName = provider
            .GetRequiredService<IOptions<MongoDbSettings>>()
            .Value.CollectionNames[nameof(BookTest)],
    }
);

// Khong can thiet, ma con bi loi vi ko xai dc Generic repository
// Unhandled exception. System.ArgumentException: Implementation constraint has not been satisfied.
//    at MongoDB.Repository.Extensions.MongoDbRepositoryServiceCollectionExtensions.AddCustomMongoDbRepository[TService,TImplementation](IServiceCollection services, Func`2 implementationFactory, ServiceLifetime serviceLifetime)
//    at Program.<Main>$(String[] args) in /workspaces/backend/THebook/Program.cs:line 118
// builder.Services.AddCustomMongoDbRepository<IBookTestRepository, BookTestRepository>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowSpecificOrigin",
//         corsPolicyBuilder => corsPolicyBuilder.WithOrigins("http://localhost:5173") // Replace with your frontend URL
//             .AllowAnyMethod()
//             .AllowAnyHeader()
//             .AllowCredentials());
// });

var app = builder.Build();

app.UseHttpLogging();

app.UseApiResponseAndExceptionWrapper<ApiResponseAutoWrapperMapObject>(
    new AutoWrapperOptions { UseApiProblemDetailsException = true }
);

// // Use the CORS policy
// app.UseCors("AllowSpecificOrigin");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
