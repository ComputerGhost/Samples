using Localization.Common.Localization.Extensions;
using System.Globalization;

var builder = WebApplication.CreateBuilder(args);

var services = builder.Services;
services.AddMvc();
services.AddMyLocalization(options =>
{
    options.SupportedCultures = new[]
    {
        new CultureInfo("en"),
        new CultureInfo("ko"),
    };
    options.DefaultCulture = new CultureInfo("en");
    options.UseRouteCulture = true;
    options.UseLocalizationResources = true;
    options.UseViewLocalization = true;
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.MapControllerRoute(
    name: "default",
    // The {culture} parameter is needed if UseRouteCulture is true.
    pattern: "{culture}/{controller}/{action}/{id?}",
    defaults: new { culture="en", controller = "Home", action = "Index" });
app.UseMyLocalization();

await app.RunAsync();
