namespace AnketniSustavZaKucanstvoLibrary.BLL.DTO
{
    public class KucanstvoDto
    {
        public int IDKucanstvo { get; set; }
        public string Sifra { get; set; }
        public VlasnikKucanstvaDto VlasnikKucanstva { get; set; }
    }
}
