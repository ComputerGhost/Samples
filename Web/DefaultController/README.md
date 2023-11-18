# Default Controller

In ASP.Net MVC, every page needs an associated method on a controller.  Even if the pages are so simple that the majority of their methods simply return the `View`, every page needs an associated method on a controller.  That is, until today.


## Initial Abandoned Idea

My first idea was to create routes for every view that does not have a matching controller action and have those routes handled by a default controller.

ASP.Net builds its routes from every `IActionDescriptorProvider` service registered on startup.  The route table uses `ControllerActionDescriptor` to store its data.  The key used to select a route is the `RouteValues` property.  The action that handles the route is specified by the `ControllerTypeInfo` and `MethodInfo` properties.

In theory, I can register a custom provider that adds a route for every view and sets each one to go through the default controller.  There is no need to worry about conflicting routes if the priority of my provider is set low (by setting its `Order` property high), but maybe I should trim duplicate routes just for cleanliness' sake.

I abandoned this idea only because I found a much simpler way of doing what I want to do.


## My New Idea

The default action providers build the routes based on the existing controller actions, not on the views, so any views that don't have an action are simply not in the routing table.  This means there are no routing conflicts for those if I want to do something... sneaky.  ;)

I added a route template `{**path}` with the values `controller` and `action` to "Default".  Place this after the default template and it will route everything the default didn't handle to DefaultController.Default with the path as the parameter.


## Limitations

The views must be in the "Views" folder, and the relative file path must match the url path.  Areas may be broken, certain localization setups may be broken, and any other setups that change the view location may be broken.  These problems can be easily fixed of course but will need fixed on a per-case basis.
