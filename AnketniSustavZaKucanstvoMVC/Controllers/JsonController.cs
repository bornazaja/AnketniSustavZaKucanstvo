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
            var list = databaseService.AnketaRepository.GetAnketeWithKucanstvo().Select(a => new
            {
                IDAnketa = a.IDAnketa,
                KucanstvoID = a.Kucanstvo.IDKucanstvo,
                Sifra = a.Kucanstvo.Sifra,
                Ime = a.Kucanstvo.VlasnikKucanstva.Ime,
                Prezime = a.Kucanstvo.VlasnikKucanstva.Prezime,
                Ulica = a.Kucanstvo.VlasnikKucanstva.Ulica,
                KucniBroj = a.Kucanstvo.VlasnikKucanstva.KucniBroj,
                Grad = a.Kucanstvo.VlasnikKucanstva.Grad.Naziv,
                IznosHraneZaProsliMjesec = a.IznosHraneZaProsliMjesec,
                IznosRacunaZaProsliMjesec = a.IznosRacunaZaProsliMjesec,
                IznosZabaveZaProsliMjesec = a.IznosZabaveZaProsliMjesec,
                IznosOstalihIzdatakaZaProsliMjesec = a.IznosOstalihIzdatakaZaProsliMjesec,
            }).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}