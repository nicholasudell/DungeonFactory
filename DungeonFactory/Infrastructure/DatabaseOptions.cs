using LiteDB;
using Microsoft.Extensions.Options;

namespace DungeonFactory.Infrastructure
{
    public static class DatabaseServiceCollectionExtensions
    {
        public static IServiceCollection AddDatabase(this IServiceCollection serviceCollection)
        {
            return serviceCollection.AddSingleton<ILiteDatabase>(services =>
            {
                var options = services.GetService<IOptions<DatabaseOptions>>()?.Value ?? new();

                BsonMapper.Global.EmptyStringToNull = options.EmptyStringToNull;

                var db = new LiteDatabase(options.ConnectionString);

                return db;
            });
        }
    }

    public class DatabaseOptions
    {
        public const string DefaultDatabase = "filename=data.db;";

        public string ConnectionString { get; set; } = DefaultDatabase;

        public bool EmptyStringToNull { get; set; } = false;

        public bool EnableLogging { get; set; } = true;
    }
}
