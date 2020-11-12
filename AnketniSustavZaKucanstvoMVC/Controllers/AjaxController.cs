using AnketniSustavZaKucanstvoLibrary.BLL.DTO;
using AnketniSustavZaKucanstvoLibrary.BLL.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Net;
using System.Web.Mvc;

namespace AnketniSustavZaKucanstvoMVC.Controllers
{
    public class AjaxController : Controller
    {
        private IAnketaService _anketaService;

        public AjaxController(IAnketaService anketaService)
        {
            _anketaService = anketaService;
        }

        // GET: Ajax
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
    }
}