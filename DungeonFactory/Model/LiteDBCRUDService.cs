using LiteDB;

namespace DungeonFactory.Model
{
    public abstract class LiteDBCRUDService<T> : ICRUD<T>
    {
        public event EventHandler CollectionChanged;

        private readonly ILiteCollection<T> collection;

        public LiteDBCRUDService(ILiteDatabase db)
        {
            if (db is null)
            {
                throw new ArgumentNullException(nameof(db));
            }

            collection = db.GetCollection<T>();
        }

        public T FindRecord(Guid id) => collection.FindById(id);

        public ILiteQueryable<T> AllRecords => collection.Query();

        /// <summary>
        /// Inserts the specified record.
        /// </summary>
        /// <param name="record"></param>
        public BsonValue Insert(T record)
        {
            var result = collection.Insert(record);

            CollectionChanged?.Invoke(this, EventArgs.Empty);

            return result;
        }


        /// <summary>
        /// Updates the specified record.
        /// </summary>
        /// <param name="record"></param>
        public void Update(T record)
        {
            collection.Update(record);

            CollectionChanged?.Invoke(this, EventArgs.Empty);
        }

        /// <summary>
        /// Deletes the specified record.
        /// </summary>
        /// <param name="record"></param>
        public void Delete(T record)
        {
            collection.Delete(GetId(record));

            CollectionChanged?.Invoke(this, EventArgs.Empty);
        }

        protected abstract BsonValue GetId(T record);

        protected ILiteCollection<T> Collection => collection;
    }
}
