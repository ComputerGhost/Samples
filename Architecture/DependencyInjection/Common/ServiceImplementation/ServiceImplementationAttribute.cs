namespace DependencyInjection.Common.ServiceImplementation;

[AttributeUsage(AttributeTargets.Class, AllowMultiple = true)]
public class ServiceImplementationAttribute : Attribute
{
    /// <remarks>
    /// If null, class must have only one interface.
    /// </remarks>
    public Type? Interface { get; set; } = null;

    public ServiceLifetime Lifetime { get; set; } = ServiceLifetime.Transient;

    internal Type GetInterface(Type implementation)
    {
        return Interface ?? DeduceInterface(implementation);
    }

    private Type DeduceInterface(Type implementation)
    {
        var inherits = implementation.GetInterfaces();
        if (inherits.Length == 1)
        {
            return inherits[0];
        }
        else
        {
            var message = "Service interface is not defined and cannot be deduced.";
            var paramName = nameof(Interface);
            throw new ArgumentException(message, paramName);
        }
    }
}
