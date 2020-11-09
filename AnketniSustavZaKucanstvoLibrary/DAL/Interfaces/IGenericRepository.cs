using System.Collections.Generic;

namespace AnketniSustavZaKucanstvoLibrary.DAL.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        void Add(T model);
        IEnumerable<T> GetAll();
    }
}
