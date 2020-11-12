using AnketniSustavZaKucanstvoLibrary.BLL.DTO;
using AnketniSustavZaKucanstvoLibrary.BLL.Services.Interfaces;
using AnketniSustavZaKucanstvoLibrary.DAL.Models;
using AnketniSustavZaKucanstvoLibrary.DAL.Repositories.Interfaces;
using AutoMapper;
using System.Collections.Generic;

namespace AnketniSustavZaKucanstvoLibrary.BLL.Services.Implementations
{
    public class KucanstvoService : GenericService<Kucanstvo, KucanstvoDto>, IKucanstvoService
    {
        private IMapper _mapper;
        private IKucanstvoRepository _kucanstvoRepository;

        public KucanstvoService(IGenericRepository<Kucanstvo> genericRepository, IMapper mapper, IKucanstvoRepository kucanstvoRepository) : base(genericRepository, mapper)
        {
            _mapper = mapper;
            _kucanstvoRepository = kucanstvoRepository;
        }

        public IEnumerable<KucanstvoDto> GetKucanstvaWithVlasniciKucanstva()
        {
            IEnumerable<Kucanstvo> kucanstva = _kucanstvoRepository.GetKucanstvaWithVlasniciKucanstva();
            return _mapper.Map<IEnumerable<Kucanstvo>, List<KucanstvoDto>>(kucanstva);
        }
    }
}
