using AnketniSustavZaKucanstvoLibrary.DAL.Interfaces;
using AnketniSustavZaKucanstvoLibrary.DAL.Models;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace AnketniSustavZaKucanstvoLibrary.DAL.Implementations
{
    public class KucanstvoRepository : GenericRepository<Kucanstvo>, IKucanstvoRepository
    {
        public IEnumerable<Kucanstvo> GetKucanstvaWithVlasnikKucanstva()
        {
            using (var db = new AnketniSustavZaKucanstvoEntities())
            {
                return db.Kucanstvoes.Include(k => k.VlasnikKucanstva.Grad).ToList();
            }
        }
    }
}
