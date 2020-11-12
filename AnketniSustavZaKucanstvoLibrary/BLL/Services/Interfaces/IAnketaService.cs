using AnketniSustavZaKucanstvoLibrary.BLL.DTO;
using AnketniSustavZaKucanstvoLibrary.DAL.Models;
using System.Collections.Generic;

namespace AnketniSustavZaKucanstvoLibrary.BLL.Services.Interfaces
{
    public interface IAnketaService : IGenericService<Anketa, AnketaDto>
    {
        IEnumerable<AnketaDto> GetAnketeWithKucanstvaAndValute();
    }
}
