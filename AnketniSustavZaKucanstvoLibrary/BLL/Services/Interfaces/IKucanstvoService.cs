using AnketniSustavZaKucanstvoLibrary.BLL.DTO;
using AnketniSustavZaKucanstvoLibrary.DAL.Models;
using System.Collections.Generic;

namespace AnketniSustavZaKucanstvoLibrary.BLL.Services.Interfaces
{
    public interface IKucanstvoService : IGenericService<Kucanstvo, KucanstvoDto>
    {
        IEnumerable<KucanstvoDto> GetKucanstvaWithVlasniciKucanstva();
    }
}
