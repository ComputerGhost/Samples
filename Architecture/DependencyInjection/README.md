# Dependency Injection

This project contains a few helpers to make DI more convenient.

## Helpers

### ServiceImplementationAttribute

Automatically wires up dependency injection for an implementation per its interface.

This is very useful for modular features.
Their services can use this attribute so they don't need to be explicitely wired up in startup.
This really adds to the drag-and-drop-between-projects ability of those features.
