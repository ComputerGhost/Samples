using DefaultController.Common.DefaultController.Extensions;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
services.AddMvc();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.MapDefaultControllerRoute();
app.UseDefaultController();

await app.RunAsync();
