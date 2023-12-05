using DependencyInjection.Common.ServiceImplementation;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace DependencyInjection.Tests;

[TestClass]
internal class AddServiceImplementationsTests
{
    // Cache so we don't have to keep assembly scanning.
    private static ServiceProvider? _serviceProvider { get; set; } = null;

    [TestInitialize]
    public void SetProviderIfNull()
    {
        _serviceProvider ??= new ServiceCollection()
            .AddServiceImplementations()
            .BuildServiceProvider();
    }

    private interface ISharedImplementation1 { }
    private interface ISharedImplementation2 { }
    [ServiceImplementation(Interface = typeof(ISharedImplementation1))]
    [ServiceImplementation(Interface = typeof(ISharedImplementation2))]
    private class SharedImplementation : ISharedImplementation1, ISharedImplementation2 { }

    [TestMethod]
    public void WhenSharedImplementation_RegistersAllAttachedInterfaces()
    {
        // act
        var implementation1 = _serviceProvider!.GetService<ISharedImplementation1>();
        var implementation2 = _serviceProvider!.GetService<ISharedImplementation2>();

        // assert
        Assert.IsInstanceOfType(implementation1, typeof(SharedImplementation));
        Assert.IsInstanceOfType(implementation2, typeof(SharedImplementation));
    }

    private interface IUnregistered { }
    private class Unregistered : IUnregistered { }

    [TestMethod]
    public void WhenNotMarkedAsImplementation_DoesNotRegisterService()
    {
        // act
        var implementation = _serviceProvider!.GetService<IUnregistered>();

        // assert
        Assert.IsNull(implementation);
    }
}
