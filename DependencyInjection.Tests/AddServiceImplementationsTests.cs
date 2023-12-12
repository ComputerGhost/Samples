using DependencyInjection.Common.ServiceImplementation;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Reflection;

namespace DependencyInjection.Tests;

[TestClass]
public class AddServiceImplementationsTests
{
    // Cache so we don't have to keep assembly scanning.
    private static ServiceProvider? _serviceProvider { get; set; } = null;

    [TestInitialize]
    public void Initialize()
    {
        var assembly = Assembly.GetExecutingAssembly();
        _serviceProvider ??= new ServiceCollection()
            .AddServiceImplementations(assembly)
            .BuildServiceProvider();
    }

    private interface IMultiple1 { }
    private interface IMultiple2 { }
    [ServiceImplementation(ServiceType = typeof(IMultiple1))]
    [ServiceImplementation(ServiceType = typeof(IMultiple2))]
    private class MultipleImplementation : IMultiple1, IMultiple2 { }

    [TestMethod]
    public void WhenSharedImplementation_RegistersAllAttachedInterfaces()
    {
        // act
        var implementation1 = _serviceProvider!.GetService<IMultiple1>();
        var implementation2 = _serviceProvider!.GetService<IMultiple2>();

        // assert
        Assert.IsInstanceOfType(implementation1, typeof(MultipleImplementation));
        Assert.IsInstanceOfType(implementation2, typeof(MultipleImplementation));
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

    private interface IGeneric<T> { }
    [ServiceImplementation]
    private class Generic : IGeneric<long> { }

    [TestMethod]
    public void WhenGenericImplementation_RegistersService()
    {
        // act
        var implementation = _serviceProvider!.GetService<IGeneric<long>>();

        // assert
        Assert.IsInstanceOfType(implementation, typeof(Generic));
    }

    private interface IOpenGeneric<T> { }
    [ServiceImplementation]
    private class OpenGeneric<T> : IOpenGeneric<T> { }

    [TestMethod]
    public void WhenOpenGenericImplementation_RegistersService()
    {
        // act
        var implementation = _serviceProvider!.GetService<IOpenGeneric<long>>();

        // assert
        Assert.IsInstanceOfType(implementation, typeof(OpenGeneric<long>));
    }
}
