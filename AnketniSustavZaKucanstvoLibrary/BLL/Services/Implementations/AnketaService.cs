using AnketniSustavZaKucanstvoLibrary.BLL.DTO;
using AnketniSustavZaKucanstvoLibrary.BLL.Services.Interfaces;
using AnketniSustavZaKucanstvoLibrary.DAL.Models;
using AnketniSustavZaKucanstvoLibrary.DAL.Repositories.Interfaces;
using AutoMapper;
using System.Collections.Generic;

namespace AnketniSustavZaKucanstvoLibrary.BLL.Services.Implementations
{
    public class AnketaService : GenericService<Anketa, AnketaDto>, IAnketaService
    {
        private IMapper _mapper;
        private IAnketaRepository _anketaRepository;

        public AnketaService(IGenericRepository<Anketa> genericRepository, IMapper mapper, IAnketaRepository anketaRepository) : base(genericRepository, mapper)
        {
            _mapper = mapper;
            _anketaRepository = anketaRepository;
        }

        public IEnumerable<AnketaDto> GetAnketeWithKucanstvaAndValute()
        {
            IEnumerable<Anketa> ankete = _anketaRepository.GetAnketeWithKucanstvaAndValute();
            return _mapper.Map<IEnumerable<Anketa>, List<AnketaDto>>(ankete);
        }
    }
}
