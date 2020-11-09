using AnketniSustavZaKucanstvoLibrary.BLL.Services;
using System;

namespace AnketniSustavZaKucanstvoConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                DatabaseService databaseService = new DatabaseService();
                foreach (var item in databaseService.AnketaRepository.GetAnketeWithKucanstvo())
                {
                    Console.WriteLine($"{item.IDAnketa} {item.Kucanstvo.Sifra} {item.Kucanstvo.VlasnikKucanstva.Ime} {item.Kucanstvo.VlasnikKucanstva.Prezime} {item.Kucanstvo.VlasnikKucanstva.Ulica} {item.Kucanstvo.VlasnikKucanstva.KucniBroj} {item.Kucanstvo.VlasnikKucanstva.Grad.Naziv} {item.IznosHraneZaProsliMjesec} {item.IznosRacunaZaProsliMjesec} {item.IznosZabaveZaProsliMjesec} {item.IznosOstalihIzdatakaZaProsliMjesec}");
                }
            }
            catch (Exception)
            {
                Console.WriteLine("Desila se greška.");
            }
        }
    }
}
