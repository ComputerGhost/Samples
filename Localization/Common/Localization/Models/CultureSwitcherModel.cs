using System.Globalization;

namespace Localization.Common.Localization.Models;

public class CultureSwitcherModel
{
    public CultureInfo CurrentUICulture { get; set; } = null!;
    public IList<CultureInfo> SupportedCultures { get; set; } = null!;
    public bool UseRouteCulture { get; set; } = false;
}
