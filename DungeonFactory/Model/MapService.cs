using LiteDB;

namespace DungeonFactory.Model
{
    public class MapService
    {
        private readonly ILiteDatabase db;

        public MapService(ILiteDatabase db)
        {
            this.db = db;
        }

        public LiteFileStream<Guid> GetMapContents(Map map) => GetMapContents(map.Id);

        public LiteFileStream<Guid> GetMapContents(Guid id)
        {
            var fs = CreateFileStorage();

            var file = fs.FindById(id);

            return file.OpenRead();
        }

        private ILiteStorage<Guid> CreateFileStorage()
        {
            return db.GetStorage<Guid>("mapFiles", "mapChunks");
        }

        public void SaveMapContents(Map map, Stream contents)
        {
            var fs = CreateFileStorage();

            fs.Upload(map.Id, map.Id.ToString() + ".jpg", contents);
        }
    }
}
