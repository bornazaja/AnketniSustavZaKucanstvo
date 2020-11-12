using AnketniSustavZaKucanstvoLibrary.BLL.DTO;
using AnketniSustavZaKucanstvoLibrary.BLL.Services.Implementations;
using AnketniSustavZaKucanstvoLibrary.BLL.Services.Interfaces;
using AnketniSustavZaKucanstvoLibrary.DAL.Models;
using AnketniSustavZaKucanstvoLibrary.DAL.Repositories.Implementations;
using AnketniSustavZaKucanstvoLibrary.DAL.Repositories.Interfaces;
using Autofac;
using AutoMapper;
using System.Linq;
using System.Reflection;

namespace AnketniSustavZaKucanstvoLibrary.BLL.Helpers
{
    public static class IoCHelper
    {
        public static void AddBasicRegistrations(ContainerBuilder containerBuilder)
        {
            containerBuilder.RegisterGeneric(typeof(GenericRepository<>)).As(typeof(IGenericRepository<>));
            containerBuilder.RegisterGeneric(typeof(GenericService<,>)).As(typeof(IGenericService<,>));

            containerBuilder.RegisterAssemblyTypes(Assembly.Load(nameof(AnketniSustavZaKucanstvoLibrary)))
                .Where(t => t.Namespace.Contains("Repositories"))
                .Where(t => t.Name.EndsWith("Repository") && !t.Name.StartsWith("Generic"))
                .AsImplementedInterfaces();

            containerBuilder.RegisterAssemblyTypes(Assembly.Load(nameof(AnketniSustavZaKucanstvoLibrary)))
                .Where(t => t.Namespace.Contains("Services"))
                .Where(t => t.Name.EndsWith("Service") && !t.Name.StartsWith("Generic"))
                .AsImplementedInterfaces();

            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Anketa, AnketaDto>().ReverseMap();
                cfg.CreateMap<Grad, GradDto>().ReverseMap();
                cfg.CreateMap<Kucanstvo, KucanstvoDto>().ReverseMap();
                cfg.CreateMap<Valuta, ValutaDto>().ReverseMap();
                cfg.CreateMap<VlasnikKucanstva, VlasnikKucanstvaDto>().ReverseMap();
            });

            var mapper = config.CreateMapper();

            containerBuilder.RegisterInstance(mapper);
        }
    }
}
