namespace AnketniSustavZaKucanstvoLibrary.BLL.DTO
{
    public class VlasnikKucanstvaDto
    {
        public int IDVlasnikKucanstva { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public string Ulica { get; set; }
        public string KucniBroj { get; set; }
        public GradDto Grad { get; set; }
    }
}
