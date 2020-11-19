using System.Collections.Generic;

namespace AnketniSustavZaKucanstvoLibrary.BLL.Services.Interfaces
{
    public interface IGenericService<TModel, TDto> where TModel : class where TDto : class
    {
        void AddRange(IEnumerable<TDto> dtoList);
        IEnumerable<TDto> GetAll();
    }
}
