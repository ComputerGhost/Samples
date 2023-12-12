namespace DependencyInjection.Common.ServiceImplementation;

[AttributeUsage(AttributeTargets.Class, AllowMultiple = true)]
public class ServiceImplementationAttribute : Attribute
{
    /// <remarks>
    /// If null, class must have only one interface.
    /// </remarks>
    public Type? ServiceType { get; set; }

    public ServiceLifetime Lifetime { get; set; } = ServiceLifetime.Transient;

    internal Type GetServiceType(Type implementationType)
    {
        var @interface = ServiceType ?? DeduceInterface(implementationType);
        return NormalizeInterface(implementationType, @interface);
    }

    private Type DeduceInterface(Type implementationType)
    {
        var interfaces = implementationType.GetInterfaces();
        if (interfaces.Length != 1)
        {
            var message = "Service interface is not defined and cannot be deduced.";
            var paramName = nameof(ServiceType);
            throw new ArgumentException(message, paramName);
        }

        return interfaces[0];
    }

    // Without this, injection of open generics won't work.
    private Type NormalizeInterface(Type implementationType, Type serviceType)
    {
        var isImplementationGeneric = implementationType.IsGenericType && implementationType.IsGenericTypeDefinition;
        var isServiceOpenGeneric = serviceType.IsGenericType && !serviceType.IsGenericTypeDefinition && serviceType.ContainsGenericParameters;
        return (isImplementationGeneric && isServiceOpenGeneric)
            ? serviceType.GetGenericTypeDefinition()
            : serviceType;
    }
}
