using AnketniSustavZaKucanstvoLibrary.DAL.Models;
using System.Collections.Generic;

namespace AnketniSustavZaKucanstvoLibrary.DAL.Interfaces
{
    public interface IAnketaRepository : IGenericRepository<Anketa>
    {
        IEnumerable<Anketa> GetAnketeWithKucanstvo();
    }
}
