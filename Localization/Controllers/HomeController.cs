using Microsoft.AspNetCore.Mvc;

namespace Localization.Controllers;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }

    public IActionResult ViewLocalization()
    {
        return View();
    }

    public IActionResult ResourceFile()
    {
        return View();
    }
}
