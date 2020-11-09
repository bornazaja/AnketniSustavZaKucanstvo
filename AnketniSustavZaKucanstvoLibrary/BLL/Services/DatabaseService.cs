using AnketniSustavZaKucanstvoLibrary.DAL.Implementations;
using AnketniSustavZaKucanstvoLibrary.DAL.Interfaces;

namespace AnketniSustavZaKucanstvoLibrary.BLL.Services
{
    public class DatabaseService
    {
        public IKucanstvoRepository KucanstvoRepository => new KucanstvoRepository();

        public IAnketaRepository AnketaRepository => new AnketaRepository();
    }
}
