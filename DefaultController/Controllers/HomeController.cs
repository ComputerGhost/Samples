using Microsoft.AspNetCore.Mvc;

namespace DefaultController.Controllers;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Normal()
    {
        return View();
    }
}
