using AnketniSustavZaKucanstvoLibrary.BLL.Helpers;
using Autofac;
using Autofac.Integration.Mvc;
using System.Reflection;
using System.Web.Mvc;

namespace AnketniSustavZaKucanstvoMVC.App_Start
{
    public static class IoCConfig
    {
        public static void Configure()
        {
            var containerBuilder = new ContainerBuilder();
            IoCHelper.AddBasicRegistrations(containerBuilder);
            containerBuilder.RegisterControllers(Assembly.GetExecutingAssembly());

            IContainer container = containerBuilder.Build();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
        }
    }
}