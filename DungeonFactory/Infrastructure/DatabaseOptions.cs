using LiteDB;
using Microsoft.Extensions.Options;

namespace DungeonFactory.Infrastructure
{
    public static class DatabaseServiceCollectionExtensions
    {
        public static IServiceCollection AddDatabase(this IServiceCollection serviceCollection)
        {
            return serviceCollection.AddSingleton(services =>
            {
                var options = services.GetService<IOptions<DatabaseOptions>>()?.Value ?? new();

                return new LiteDatabase(options.ConnectionString);
            });
        }
    }

    public class DatabaseOptions
    {
        public const string DefaultDatabase = "data.db";

        public string ConnectionString { get; set; } = DefaultDatabase;
    }
}
