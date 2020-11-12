using AnketniSustavZaKucanstvoLibrary.DAL.Models;
using System.Collections.Generic;

namespace AnketniSustavZaKucanstvoLibrary.DAL.Repositories.Interfaces
{
    public interface IKucanstvoRepository : IGenericRepository<Kucanstvo>
    {
        IEnumerable<Kucanstvo> GetKucanstvaWithVlasniciKucanstva();
    }
}
