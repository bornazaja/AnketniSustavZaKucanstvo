using AnketniSustavZaKucanstvoLibrary.DAL.Models;
using AnketniSustavZaKucanstvoLibrary.DAL.Repositories.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace AnketniSustavZaKucanstvoLibrary.DAL.Repositories.Implementations
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        public void AddRange(IEnumerable<T> modelList)
        {
            using (var db = new AnketniSustavZaKucanstvoEntities())
            {
                db.Set<T>().AddRange(modelList);
                db.SaveChanges();
            }
        }

        public IEnumerable<T> GetAll()
        {
            using (var db = new AnketniSustavZaKucanstvoEntities())
            {
                return db.Set<T>().ToList();
            }
        }
    }
}
