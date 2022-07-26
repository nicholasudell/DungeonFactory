using LiteDB;
using System.Collections;
using System.Collections.ObjectModel;

namespace DungeonFactory.Model
{
    public class Map : Document
    {
        public static Map CreateMap()
        {
            var map = new Map()
            {
                Id = Guid.NewGuid(),
                Title = "New Page"
            };

            return map;
        }

        public bool HasMap { get; set; }
    }

    public class Document
    {
        public static Document CreateDocument()
        {
            var document = new Document()
            {
                Id = Guid.NewGuid(),
                Title = "New Page"
            };

            document.Blocks.Add(new MarkdownBlock()
            {
                Content = string.Empty
            });

            return document;
        }

        public Guid Id { get; set; }

        public string Title { get; set; }

        public List<Block> Blocks { get; set; } = new List<Block>();

        public List<Document> Children { get; set; } = new List<Document>();

        public bool IsStartingDocument { get; set; } = false;
    }
}
