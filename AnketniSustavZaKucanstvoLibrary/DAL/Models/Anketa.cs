//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AnketniSustavZaKucanstvoLibrary.DAL.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Anketa
    {
        public int IDAnketa { get; set; }
        public int KucanstvoID { get; set; }
        public decimal IznosHraneZaProsliMjesec { get; set; }
        public decimal IznosRacunaZaProsliMjesec { get; set; }
        public decimal IznosZabaveZaProsliMjesec { get; set; }
        public decimal IznosOstalihIzdatakaZaProsliMjesec { get; set; }
        public int ValutaID { get; set; }
    
        public virtual Kucanstvo Kucanstvo { get; set; }
        public virtual Valuta Valuta { get; set; }
    }
}
