using AnketniSustavZaKucanstvoLibrary.BLL.Helpers;
using Autofac;

namespace AnketniSustavZaKucanstvoConsole
{
    public static class IoCConfig
    {
        public static IContainer GetContainer()
        {
            var containerBuilder = new ContainerBuilder();
            IoCHelper.AddBasicRegistrations(containerBuilder);
            containerBuilder.RegisterType<Application>().As<IApplication>();
            return containerBuilder.Build();
        }
    }
}
