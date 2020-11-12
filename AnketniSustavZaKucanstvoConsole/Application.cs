using AnketniSustavZaKucanstvoLibrary.BLL.DTO;
using AnketniSustavZaKucanstvoLibrary.BLL.Services.Interfaces;
using System;
using System.Collections.Generic;

namespace AnketniSustavZaKucanstvoConsole
{
    public class Application : IApplication
    {
        private IAnketaService _anketaService;

        public Application(IAnketaService anketaService)
        {
            _anketaService = anketaService;
        }

        public void Run()
        {
            try
            {
                IEnumerable<AnketaDto> ankete = _anketaService.GetAnketeWithKucanstvaAndValute();

                foreach (var anketa in ankete)
                {
                    Console.WriteLine($"{anketa.IDAnketa} {anketa.Kucanstvo.Sifra} {anketa.Kucanstvo.VlasnikKucanstva.Ime} {anketa.Kucanstvo.VlasnikKucanstva.Prezime} {anketa.Kucanstvo.VlasnikKucanstva.Ulica} {anketa.Kucanstvo.VlasnikKucanstva.KucniBroj} {anketa.Kucanstvo.VlasnikKucanstva.Grad.Naziv} {anketa.IznosHraneZaProsliMjesec} {anketa.IznosRacunaZaProsliMjesec} {anketa.IznosZabaveZaProsliMjesec} {anketa.IznosOstalihIzdatakaZaProsliMjesec} {anketa.Valuta.Naziv}");
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }
    }
}
