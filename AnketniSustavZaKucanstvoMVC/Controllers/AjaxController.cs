using AnketniSustavZaKucanstvoLibrary.BLL.Services;
using AnketniSustavZaKucanstvoLibrary.DAL.Models;
using System;
using System.Collections.Generic;
using System.Net;
using System.Web.Mvc;

namespace AnketniSustavZaKucanstvoMVC.Controllers
{
    public class AjaxController : Controller
    {
        private static DatabaseService databaseService = new DatabaseService();

        // GET: Ajax
        public ActionResult SaveAnkete(List<Anketa> ankete)
        {
            try
            {
                foreach (var item in ankete)
                {
                    databaseService.AnketaRepository.Add(item);
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