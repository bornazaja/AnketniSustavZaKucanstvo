using AnketniSustavZaKucanstvoLibrary.DAL.Models;
using System.Collections.Generic;

namespace AnketniSustavZaKucanstvoLibrary.DAL.Interfaces
{
    public interface IKucanstvoRepository : IGenericRepository<Kucanstvo>
    {
        IEnumerable<Kucanstvo> GetKucanstvaWithVlasnikKucanstva();
    }
}
