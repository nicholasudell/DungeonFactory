namespace DungeonFactory.Model
{
    public interface ICRUD<TRecord>
    {
        /// <summary>
        /// Inserts the specified record.
        /// </summary>
        /// <param name="record">The record.</param>
        void Insert(TRecord record);

        /// <summary>
        /// Updates the specified record.
        /// </summary>
        /// <param name="record">The record.</param>
        void Update(TRecord record);

        /// <summary>
        /// Deletes the specified record.
        /// </summary>
        /// <param name="record">The record.</param>
        void Delete(TRecord record);
    }
}
