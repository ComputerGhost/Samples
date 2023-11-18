using Localization.Common.Localization.Models;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Localization.Common.Localization.ViewComponents;

public class CultureSwitcherViewComponent : ViewComponent
{
    private readonly LocalizationOptions _localizationOptions;

    public CultureSwitcherViewComponent(IOptions<LocalizationOptions> options)
    {
        _localizationOptions = options.Value;
    }

    public IViewComponentResult Invoke()
    {
        var cultureFeature = HttpContext.Features.Get<IRequestCultureFeature>();
        if (cultureFeature == null)
        {
            var message = "`UseMyLocalization` (which calls the needed `UseRequestLocalization`) needs to be called at startup.";
            throw new InvalidOperationException(message);
        }

        // If `LocalizationOptions` is replaced by `RequestLocalizationOptions`,
        // then the correct property to use here is `SupportedUICultures`.
        var supportedCultures = _localizationOptions.SupportedCultures;

        var model = new CultureSwitcherModel
        {
            SupportedCultures = supportedCultures,
            CurrentUICulture = cultureFeature.RequestCulture.UICulture,
            UseRouteCulture = _localizationOptions.UseRouteCulture,
        };

        return View(model);
    }
}