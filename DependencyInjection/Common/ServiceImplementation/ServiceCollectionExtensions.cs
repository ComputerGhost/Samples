using System.Reflection;

namespace DependencyInjection.Common.ServiceImplementation;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddServiceImplementations(this IServiceCollection services)
    {
        var assembly = Assembly.GetExecutingAssembly();
        return services.AddServiceImplementations(assembly);
    }

    public static IServiceCollection AddServiceImplementations(this IServiceCollection services, Assembly assembly)
    {
        foreach (var implementationType in assembly.GetTypes())
        {
            foreach (var attribute in implementationType.GetCustomAttributes<ServiceImplementationAttribute>())
            {
                var serviceType = attribute.GetServiceType(implementationType);
                services.Add(new ServiceDescriptor(serviceType, implementationType, attribute.Lifetime));
            }
        }

        return services;
    }
}
