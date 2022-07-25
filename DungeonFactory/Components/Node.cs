using DungeonFactory.Model;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SemanticComponents
{
	public class Node : ICollection<Node>
	{
		public List<Node> Children { get; set; } = new();

        public bool Expanded { get; set; } = false;

        public Node(Document document)
        {
            Document = document;

            foreach(var child in Document.Children)
            {
                Children.Add(new Node(child));
            }
        }


        public int Count => ((ICollection<Node>)Children).Count;

        public bool IsReadOnly => ((ICollection<Node>)Children).IsReadOnly;

        public Document Document { get; }

        public void Add(Node item)
        {
            ((ICollection<Node>)Children).Add(item);
        }

        public void Clear()
        {
            ((ICollection<Node>)Children).Clear();
        }

        public bool Contains(Node item)
        {
            return ((ICollection<Node>)Children).Contains(item);
        }

        public void CopyTo(Node[] array, int arrayIndex)
        {
            ((ICollection<Node>)Children).CopyTo(array, arrayIndex);
        }

        public IEnumerator<Node> GetEnumerator()
        {
            return ((IEnumerable<Node>)Children).GetEnumerator();
        }

        public bool Remove(Node item)
        {
            return ((ICollection<Node>)Children).Remove(item);
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return ((IEnumerable)Children).GetEnumerator();
        }
    }
}
