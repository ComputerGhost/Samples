using DependencyInjection.Common.ServiceImplementation;
using DependencyInjection.Services.Interfaces;

namespace DependencyInjection.Services;

[ServiceImplementation]
public class UnspecifiedInterface : IUnspecifiedInterface
{
    public string GetName()
    {
        return nameof(UnspecifiedInterface);
    }
}
