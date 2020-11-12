using Autofac;

namespace AnketniSustavZaKucanstvoConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            IContainer container = IoCConfig.GetContainer();

            using (var scope = container.BeginLifetimeScope())
            {
                IApplication application = scope.Resolve<IApplication>();
                application.Run();
            }
        }
    }
}
