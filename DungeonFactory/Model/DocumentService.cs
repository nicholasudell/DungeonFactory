using LiteDB;

namespace DungeonFactory.Model
{

    public class DocumentService : LiteDBCRUDService<Document>
    {
        readonly Dictionary<Guid, Document> docCache = new ();
        readonly Dictionary<Document, Document> rootCache = new();

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

        public Document? FindRoot(Document node)
        {
            if (rootCache.TryGetValue(node, out var cachedNode))
            {
                return cachedNode;
            }

            (_, var root) = FindNode(node.Id);

            return root;
        }

        public (Document? node, Document? root) FindNode(Guid id)
        {
            if (docCache.TryGetValue(id, out var cachedNode))
            {
                return (cachedNode, rootCache[cachedNode]);
            }

            var walker = new TreeWalker<Document>(x => x.Children);

            foreach (var root in AllRecords.ToList())
            {
                (var node, var success) = walker.Find(root, x => x.Id == id);

                if (success)
                {
                    docCache.Add(id, node!);
                    rootCache.Add(node!, root);

                    return (node, root);
                }
            }

            return (null, null);
        }

        protected override BsonValue GetId(Document record) => record.Id;
    }
}
