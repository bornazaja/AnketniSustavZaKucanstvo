using AnketniSustavZaKucanstvoLibrary.BLL.DTO;
using AnketniSustavZaKucanstvoLibrary.BLL.Services.Interfaces;
using AnketniSustavZaKucanstvoLibrary.DAL.Models;
using AnketniSustavZaKucanstvoLibrary.DAL.Repositories.Interfaces;
using AutoMapper;

namespace AnketniSustavZaKucanstvoLibrary.BLL.Services.Implementations
{
    public class ValutaService : GenericService<Valuta, ValutaDto>, IValutaService
    {
        public ValutaService(IGenericRepository<Valuta> genericRepository, IMapper mapper) : base(genericRepository, mapper)
        {

        }
    }
}
