using AnketniSustavZaKucanstvoLibrary.DAL.Interfaces;
using AnketniSustavZaKucanstvoLibrary.DAL.Models;
using System.Collections.Generic;
using System.Linq;

namespace AnketniSustavZaKucanstvoLibrary.DAL.Implementations
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        public void Add(T model)
        {
            using (var db = new AnketniSustavZaKucanstvoEntities())
            {
                db.Set<T>().Add(model);
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
