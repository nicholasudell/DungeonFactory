using LiteDB;
using System.Collections;
using System.Collections.ObjectModel;

namespace DungeonFactory.Model
{
    public class Document
    {
        public static Document CreateDocument()
        {
            var document = new Document()
            {
                Title = "New Page"
            };

            document.Blocks.Add(new MarkdownBlock()
            {
                Content = string.Empty
            });

            return document;
        }

        public int Id { get; set; }

        public string Title { get; set; }

        public List<Block> Blocks { get; set; } = new List<Block>();

        public bool IsStartingDocument { get; set; } = false;
    }
}
