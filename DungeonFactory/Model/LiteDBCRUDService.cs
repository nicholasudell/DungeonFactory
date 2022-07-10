using LiteDB;

namespace DungeonFactory.Model
{
    public abstract class LiteDBCRUDService<T> : ICRUD<T>
    {
        private readonly ILiteCollection<T> collection;

        public LiteDBCRUDService(ILiteDatabase db)
        {
            if (db is null)
            {
                throw new ArgumentNullException(nameof(db));
            }

            collection = db.GetCollection<T>();
        }

        public T FindRecord(int id) => collection.FindById(id);

        public ILiteQueryable<T> AllRecords => collection.Query();

        /// <summary>
        /// Inserts the specified record.
        /// </summary>
        /// <param name="record"></param>
        public void Insert(T record) => collection.Insert(record);

        /// <summary>
        /// Updates the specified record.
        /// </summary>
        /// <param name="record"></param>
        public void Update(T record) => collection.Update(record);

        /// <summary>
        /// Deletes the specified record.
        /// </summary>
        /// <param name="record"></param>
        public void Delete(T record) => collection.Delete(GetId(record));

        protected abstract BsonValue GetId(T record);

        protected ILiteCollection<T> Collection => collection;
    }
}
