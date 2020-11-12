using AnketniSustavZaKucanstvoLibrary.BLL.Services.Interfaces;
using System.Linq;
using System.Web.Mvc;

namespace AnketniSustavZaKucanstvoMVC.Controllers
{
    public class JsonController : Controller
    {
        private IKucanstvoService _kucanstvoService;
        private IAnketaService _anketaService;
        private IValutaService _valutaService;

        public JsonController(IKucanstvoService kucanstvoService, IAnketaService anketaService, IValutaService valutaService)
        {
            _kucanstvoService = kucanstvoService;
            _anketaService = anketaService;
            _valutaService = valutaService;
        }

        // GET: Json
        public ActionResult GetKucanstva()
        {
            var kucanstva = _kucanstvoService.GetKucanstvaWithVlasniciKucanstva().Select(k => new
            {
                IDKucanstvo = k.IDKucanstvo,
                Sifra = k.Sifra,
                Ime = k.VlasnikKucanstva.Ime,
                Prezime = k.VlasnikKucanstva.Prezime,
                Ulica = k.VlasnikKucanstva.Ulica,
                KucniBroj = k.VlasnikKucanstva.KucniBroj,
                Grad = k.VlasnikKucanstva.Grad.Naziv
            }).ToList();
            return Json(kucanstva, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetAnkete()
        {
            var ankete = _anketaService.GetAnketeWithKucanstvaAndValute().Select(a => new
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
                Valuta = a.Valuta.Naziv
            }).ToList();
            return Json(ankete, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetValute()
        {
            var valute = _valutaService.GetAll().Select(v => new
            {
                IDValuta = v.IDValuta,
                Naziv = v.Naziv
            }).ToList();
            return Json(valute, JsonRequestBehavior.AllowGet);
        }
    }
}