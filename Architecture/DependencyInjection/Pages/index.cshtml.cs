using DependencyInjection.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DependencyInjection.Pages;

public class IndexModel : PageModel
{
    public List<string> Interfaces { get; set; } = new();

    public void OnGet(
        [FromServices] ISpecifiedInterface specifiedInterface,
        [FromServices] IUnspecifiedInterface unspecifiedInterface)
    {
        Interfaces.Add(specifiedInterface.GetName());
        Interfaces.Add(unspecifiedInterface.GetName());
    }
}
