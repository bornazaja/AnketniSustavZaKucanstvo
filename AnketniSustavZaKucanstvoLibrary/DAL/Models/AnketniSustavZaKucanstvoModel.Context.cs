﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class AnketniSustavZaKucanstvoEntities : DbContext
    {
        public AnketniSustavZaKucanstvoEntities()
            : base("name=AnketniSustavZaKucanstvoEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Anketa> Anketas { get; set; }
        public virtual DbSet<Grad> Grads { get; set; }
        public virtual DbSet<Kucanstvo> Kucanstvoes { get; set; }
        public virtual DbSet<Valuta> Valutas { get; set; }
        public virtual DbSet<VlasnikKucanstva> VlasnikKucanstvas { get; set; }
    }
}
