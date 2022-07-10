using LiteDB;

namespace DungeonFactory.Model
{
    public class DocumentService : LiteDBCRUDService<Document>
    {
        public DocumentService(ILiteDatabase db) : base(db)
        {
        }

        public Document GetDefault()
        {
            Collection.EnsureIndex(x => x.IsStartingDocument);

            var @default = AllRecords.Where(x => x.IsStartingDocument == true).FirstOrDefault();

            if (@default is null)
            {
                @default = new Document()
                {
                    Title = "Home",
                    IsStartingDocument = true
                };

                @default.Blocks.Add(new MarkdownBlock()
                {
                    Content = string.Empty
                });

                Insert(@default);
            }

            return @default;
        }

        protected override BsonValue GetId(Document record) => record.Id;
    }
}
