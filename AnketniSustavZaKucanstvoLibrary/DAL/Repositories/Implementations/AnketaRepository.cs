using AnketniSustavZaKucanstvoLibrary.DAL.Models;
using AnketniSustavZaKucanstvoLibrary.DAL.Repositories.Interfaces;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace AnketniSustavZaKucanstvoLibrary.DAL.Repositories.Implementations
{
    public class AnketaRepository : GenericRepository<Anketa>, IAnketaRepository
    {
        public IEnumerable<Anketa> GetAnketeWithKucanstvaAndValute()
        {
            using (var db = new AnketniSustavZaKucanstvoEntities())
            {
                return db.Anketas.Include(a => a.Kucanstvo.VlasnikKucanstva.Grad).Include(a => a.Valuta).ToList();
            }
        }
    }
}
