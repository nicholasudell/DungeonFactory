namespace DungeonFactory.Model
{
    public class ValueEventArgs<T> : EventArgs
    {
        public ValueEventArgs(T value)
        {
            Value = value;
        }

        public ValueEventArgs(T oldValue, T value)
        {
            OldValue = oldValue;
            Value = value;
        }

        public T? OldValue { get; }
        public T Value { get; }
    }
}
