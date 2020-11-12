using AnketniSustavZaKucanstvoLibrary.DAL.Models;
using System.Collections.Generic;

namespace AnketniSustavZaKucanstvoLibrary.DAL.Repositories.Interfaces
{
    public interface IAnketaRepository : IGenericRepository<Anketa>
    {
        IEnumerable<Anketa> GetAnketeWithKucanstvaAndValute();
    }
}
