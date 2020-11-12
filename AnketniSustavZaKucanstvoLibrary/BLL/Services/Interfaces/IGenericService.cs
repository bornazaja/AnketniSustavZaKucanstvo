using System.Collections.Generic;

namespace AnketniSustavZaKucanstvoLibrary.BLL.Services.Interfaces
{
    public interface IGenericService<TModel, TDto> where TModel : class where TDto : class
    {
        void Add(TDto dto);
        IEnumerable<TDto> GetAll();
    }
}
