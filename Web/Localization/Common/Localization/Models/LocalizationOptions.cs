using System.Globalization;

namespace Localization.Common.Localization.Models;

public class LocalizationOptions
{
    public IList<CultureInfo> SupportedCultures { get; set; } = null!;

    public CultureInfo DefaultCulture { get; set; } = null!;

    /// <summary>
    /// Enables the use of resource (.resx) files for localizers to use for translations.
    /// </summary>
    /// <remarks>
    /// The resource files should be placed in the "Resources" folder.  The 
    /// internals of that folder should mirror that of the "Views" folder.
    /// </remarks>
    public bool UseLocalizationResources { get; set; } = false;

    /// <summary>
    /// Prioritizes the `culture` parameter from the route template for determining the culture.
    /// </summary>
    /// <remarks>
    /// This does not work in Razor Pages because route data is set after 
    /// localization data. A `PageRouteModelConvention` along with other tools 
    /// can remedy this, but that really overcomplicates the project.  Just 
    /// use MVC at that point.
    /// </remarks>
    public bool UseRouteCulture { get; set; } = false;

    /// <summary>
    /// Enables entire view localization by having variants use the i18n code as an extension.
    /// </summary>
    /// <example>
    /// A view named Index.cshtml may have a translated version named Index.ko.cshtml.
    /// </example>
    public bool UseViewLocalization { get; set; } = false;
}
