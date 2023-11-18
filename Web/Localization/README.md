# Localization

This project shows several good ways to handle localization in ASP.Net MVC projects.

## Razor Pages are broken

Razor Pages configure the localization before the route data is built.  That means the culture can't be (easily) obtained from the URL.  Sure, the other RequestCultureProviders still work, but those aren't as good.


## The best way

The current culture should be included in the URL.  This is good for search engines and users alike.

Translations should be linked to the main page (bidirectionally) using `<meta rel='alternate' hreflang='{culture}' href='{full-url}'>`.  Google likes this.

Now for where to store the translations:  on that you have flexibility.


## Areas of improvment

Turn on `UseLocalizationResources`.  Why must the model be in the same namespace as the view?  There must be a better way to do this.  I haven't needed to put in the effort to find that better way yet.
