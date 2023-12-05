using DependencyInjection.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DependencyInjection.Pages;

public class IndexModel : PageModel
{
    public List<string> Interfaces { get; set; } = new();

    public void OnGet(
        [FromServices] IMultipleInterfaces1 multipleInterface1,
        [FromServices] IMultipleInterfaces2 multipleInterface2,
        [FromServices] ISpecifiedInterface specifiedInterface,
        [FromServices] IUnspecifiedInterface unspecifiedInterface)
    {
        Interfaces.Add(multipleInterface1.GetName());
        Interfaces.Add(multipleInterface2.GetName());
        Interfaces.Add(specifiedInterface.GetName());
        Interfaces.Add(unspecifiedInterface.GetName());
    }
}
