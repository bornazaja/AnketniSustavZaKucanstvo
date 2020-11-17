using System.Net;
using System.Web.Mvc;

namespace AnketniSustavZaKucanstvoMVC.Controllers
{
    public class TestController : Controller
    {
        // GET: Test
        public ActionResult Test()
        {
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }
    }
}