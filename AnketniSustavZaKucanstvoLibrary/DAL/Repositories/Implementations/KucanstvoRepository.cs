using AnketniSustavZaKucanstvoLibrary.DAL.Models;
using AnketniSustavZaKucanstvoLibrary.DAL.Repositories.Interfaces;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace AnketniSustavZaKucanstvoLibrary.DAL.Repositories.Implementations
{
    public class KucanstvoRepository : GenericRepository<Kucanstvo>, IKucanstvoRepository
    {
        public IEnumerable<Kucanstvo> GetKucanstvaWithVlasniciKucanstva()
        {
            using (var db = new AnketniSustavZaKucanstvoEntities())
            {
                return db.Kucanstvoes.Include(k => k.VlasnikKucanstva.Grad).ToList();
            }
        }
    }
}
