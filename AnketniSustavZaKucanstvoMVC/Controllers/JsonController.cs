using AnketniSustavZaKucanstvoLibrary.BLL.Services;
using System.Linq;
using System.Web.Mvc;

namespace AnketniSustavZaKucanstvoMVC.Controllers
{
    public class JsonController : Controller
    {
        private static DatabaseService databaseService = new DatabaseService();

        // GET: Json
        public ActionResult GetKucanstva()
        {
            var list = databaseService.KucanstvoRepository.GetKucanstvaWithVlasnikKucanstva().Select(k => new
            {
                IDKucanstvo = k.IDKucanstvo,
                Sifra = k.Sifra,
                Ime = k.VlasnikKucanstva.Ime,
                Prezime = k.VlasnikKucanstva.Prezime,
                Ulica = k.VlasnikKucanstva.Ulica,
                KucniBroj = k.VlasnikKucanstva.KucniBroj,
                Grad = k.VlasnikKucanstva.Grad.Naziv
            }).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetAnkete()
        {
            var list = databaseService.AnketaRepository.GetAnketeWithKucanstvo().Select(ak => new
            {
                IDAnketa = ak.IDAnketa,
                KucanstvoID = ak.Kucanstvo.IDKucanstvo,
                Sifra = ak.Kucanstvo.Sifra,
                Ime = ak.Kucanstvo.VlasnikKucanstva.Ime,
                Prezime = ak.Kucanstvo.VlasnikKucanstva.Prezime,
                Ulica = ak.Kucanstvo.VlasnikKucanstva.Ulica,
                KucniBroj = ak.Kucanstvo.VlasnikKucanstva.KucniBroj,
                Grad = ak.Kucanstvo.VlasnikKucanstva.Grad.Naziv,
                IznosHraneZaProsliMjesec = ak.IznosHraneZaProsliMjesec,
                IznosRacunaZaProsliMjesec = ak.IznosRacunaZaProsliMjesec,
                IznosZabaveZaProsliMjesec = ak.IznosZabaveZaProsliMjesec,
                IznosOstalihIzdatakaZaProsliMjesec = ak.IznosOstalihIzdatakaZaProsliMjesec,
            }).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}