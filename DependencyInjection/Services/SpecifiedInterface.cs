using DependencyInjection.Common.ServiceImplementation;
using DependencyInjection.Services.Interfaces;

namespace DependencyInjection.Services;

[ServiceImplementation(Interface = typeof(ISpecifiedInterface))]
public class SpecifiedInterface : ISpecifiedInterface, IUnusedInterface
{
    public void DoNothing()
    {
    }

    public string GetName()
    {
        return nameof(SpecifiedInterface);
    }
}
