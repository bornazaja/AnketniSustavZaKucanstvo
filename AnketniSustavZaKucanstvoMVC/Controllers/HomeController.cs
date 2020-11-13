using AnketniSustavZaKucanstvoLibrary.BLL.DTO;
using AnketniSustavZaKucanstvoLibrary.BLL.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Mvc;

namespace AnketniSustavZaKucanstvoMVC.Controllers
{
    public class HomeController : Controller
    {
        private IKucanstvoService _kucanstvoService;
        private IAnketaService _anketaService;
        private IValutaService _valutaService;

        public HomeController(IKucanstvoService kucanstvoService, IAnketaService anketaService, IValutaService valutaService)
        {
            _kucanstvoService = kucanstvoService;
            _anketaService = anketaService;
            _valutaService = valutaService;
        }

        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult SaveAnkete(List<AnketaDto> ankete)
        {
            try
            {
                foreach (var anketa in ankete)
                {
                    _anketaService.Add(anketa);
                }

                return new HttpStatusCodeResult(HttpStatusCode.OK);
            }
            catch (Exception)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
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

        public ActionResult GetKucanstva()
        {
            var kucanstva = _kucanstvoService.GetKucanstvaWithVlasniciKucanstva().Select(k => new
            {
                Key = k.IDKucanstvo,
                Value = $"{k.Sifra} {k.VlasnikKucanstva.Ime} {k.VlasnikKucanstva.Prezime} { k.VlasnikKucanstva.Ulica } {k.VlasnikKucanstva.KucniBroj} {k.VlasnikKucanstva.Grad.Naziv}"
            }).ToList();
            return Json(kucanstva, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetValute()
        {
            var valute = _valutaService.GetAll().Select(v => new
            {
                Key = v.IDValuta,
                Value = v.Naziv
            }).ToList();
            return Json(valute, JsonRequestBehavior.AllowGet);
        }
    }
}