using AnketniSustavZaKucanstvoLibrary.DAL.Interfaces;
using AnketniSustavZaKucanstvoLibrary.DAL.Models;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace AnketniSustavZaKucanstvoLibrary.DAL.Implementations
{
    public class AnketaRepository : GenericRepository<Anketa>, IAnketaRepository
    {
        public IEnumerable<Anketa> GetAnketeWithKucanstvo()
        {
            using (var db = new AnketniSustavZaKucanstvoEntities())
            {
                return db.Anketas.Include(a => a.Kucanstvo.VlasnikKucanstva.Grad).ToList();
            }
        }
    }
}
