using System.ComponentModel.DataAnnotations;

namespace AnketniSustavZaKucanstvoLibrary.BLL.DTO
{
    public class AnketaDto
    {
        public int IDAnketa { get; set; }

        [Required(ErrorMessage = "Kućanstvo je obavezno")]
        public int KucanstvoID { get; set; }

        [Required(ErrorMessage = "Iznos hrane za prošli mjesec je obavezan")]
        [Range(1, double.MaxValue, ErrorMessage = "Iznos hrane za prošli mjesec mora biti veći ili jednak 1")]
        public double IznosHraneZaProsliMjesec { get; set; }

        [Required(ErrorMessage = "Iznos računa za prošli mjesec je obavezan")]
        [Range(1, double.MaxValue, ErrorMessage = "Iznos računa za prošli mjesec mora biti veći ili jednak 1")]
        public double IznosRacunaZaProsliMjesec { get; set; }

        [Required(ErrorMessage = "Iznos zabave za prošli mjesec je obavezan")]
        [Range(1, double.MaxValue, ErrorMessage = "Iznos zabave za prošli mjesec mora biti veći ili jednak 1")]
        public double IznosZabaveZaProsliMjesec { get; set; }

        [Required(ErrorMessage = "Iznos ostalih izdataka za prošli mjesec je obavezan")]
        [Range(1, double.MaxValue, ErrorMessage = "Iznos ostalih izdataka za prošli mjesec mora biti veći ili jednak 1")]
        public double IznosOstalihIzdatakaZaProsliMjesec { get; set; }

        [Required(ErrorMessage = "Valuta je obavezna")]
        public int ValutaID { get; set; }

        public KucanstvoDto Kucanstvo { get; set; }
        public ValutaDto Valuta { get; set; }
    }
}
