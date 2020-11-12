using AnketniSustavZaKucanstvoLibrary.BLL.Services.Interfaces;
using AnketniSustavZaKucanstvoLibrary.DAL.Repositories.Interfaces;
using AutoMapper;
using System.Collections.Generic;

namespace AnketniSustavZaKucanstvoLibrary.BLL.Services.Implementations
{
    public class GenericService<TModel, TDto> : IGenericService<TModel, TDto> where TModel : class where TDto : class
    {
        private IGenericRepository<TModel> _genericRepository;
        private IMapper _mapper;

        public GenericService(IGenericRepository<TModel> genericRepository, IMapper mapper)
        {
            _genericRepository = genericRepository;
            _mapper = mapper;
        }

        public void Add(TDto dto)
        {
            TModel model = _mapper.Map<TDto, TModel>(dto);
            _genericRepository.Add(model);
        }

        public IEnumerable<TDto> GetAll()
        {
            IEnumerable<TModel> list = _genericRepository.GetAll();
            return _mapper.Map<IEnumerable<TModel>, List<TDto>>(list);
        }
    }
}
