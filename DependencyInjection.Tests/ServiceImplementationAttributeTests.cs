using DependencyInjection.Common.ServiceImplementation;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace DependencyInjection.Tests;

[TestClass]
public class ServiceImplementationAttributeTests
{
    private interface Interface1 { }
    private interface Interface2 { }
    private class OneInterface : Interface1 { }
    private class TwoInterfaces : Interface1, Interface2 { }

    [TestMethod]
    public void WhenInterfaceNotSpecified_AndOneInterface_DeducesInterface()
    {
        // arrange
        var attribute = new ServiceImplementationAttribute();
        var implementation = typeof(OneInterface);

        // act
        var @interface = attribute.GetServiceType(implementation);

        // assert
        Assert.AreEqual(@interface, typeof(Interface1));
    }

    [TestMethod]
    public void WhenInterfaceNotSpecified_AndTwoInterfaces_ThrowsException()
    {
        // arrange
        var attribute = new ServiceImplementationAttribute();
        var implementation = typeof(TwoInterfaces);

        // act
        var getInterface = () => attribute.GetServiceType(implementation);

        // assert
        Assert.ThrowsException<ArgumentException>(getInterface);
    }

    [TestMethod]
    public void WhenInterfaceSpecified_AndOneInterface_UsesSpecifiedInterface()
    {
        // arrange
        var attribute = new ServiceImplementationAttribute { ServiceType = typeof(Interface1) };
        var implementation = typeof(OneInterface);

        // act
        var @interface = attribute.GetServiceType(implementation);

        // assert
        Assert.AreEqual(@interface, typeof(Interface1));
    }

    [TestMethod]
    public void WhenInterfaceSpecified_AndTwoInterfaces_UsesSpecifiedInterface()
    {
        // arrange
        var attribute = new ServiceImplementationAttribute { ServiceType = typeof(Interface1) };
        var implementation = typeof(TwoInterfaces);

        // act
        var @interface = attribute.GetServiceType(implementation);

        // assert
        Assert.AreEqual(@interface, typeof(Interface1));
    }
}
