using DependencyInjection.Common.ServiceImplementation;
using System.Runtime.CompilerServices;

[assembly: InternalsVisibleTo("DependencyInjection.Tests")]

var builder = WebApplication.CreateBuilder(args);

var services = builder.Services;
services.AddRazorPages();
services.AddServiceImplementations();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.MapRazorPages();

await app.RunAsync();
