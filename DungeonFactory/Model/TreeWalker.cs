namespace DungeonFactory.Model
{
    public class TreeWalker<T> where T: class
    {
        private readonly Func<T, IEnumerable<T>> childrenSelector;

        public TreeWalker(Func<T, IEnumerable<T>> childrenSelector)
        {
            this.childrenSelector = childrenSelector;
        }

        public (T? result, bool success) Find(T root, Func<T,bool> predicate)
        {
            if(predicate(root))
            {
                return (root, true);
            }

            foreach(var child in childrenSelector(root))
            {
                (var result, var success) = Find(child, predicate);
                
                if (success)
                {
                    return (result, success);
                }
            }

            return (default(T), false);
        }
    }
}
