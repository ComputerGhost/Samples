using DependencyInjection.Common.ServiceImplementation;
using DependencyInjection.Services.Interfaces;

namespace DependencyInjection.Services;

[ServiceImplementation(Interface = typeof(IMultipleInterfaces1))]
[ServiceImplementation(Interface = typeof(IMultipleInterfaces2))]
public class MultipleInterfaces : IMultipleInterfaces1, IMultipleInterfaces2
{
    public string GetName()
    {
        return nameof(MultipleInterfaces);
    }
}
