using System.Collections.Generic;

namespace AnketniSustavZaKucanstvoLibrary.DAL.Repositories.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        void AddRange(IEnumerable<T> modelList);
        IEnumerable<T> GetAll();
    }
}
