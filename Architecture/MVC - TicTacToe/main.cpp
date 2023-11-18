#include <iostream>

#include "Controllers/Controller.hpp"
#include "Controllers/WelcomeController.hpp"
#include "Models/ProgramState.hpp"

int main()
{
	ProgramState state = ProgramState();
	state.setController(new WelcomeController(&state));

	Controller* controller = nullptr;
	do {
		if (controller != state.getController()) {
			controller = state.getController();
			controller->handleLoad();
		}

		std::cout << "> ";
		std::string command;
		std::getline(std::cin, command);
		controller->handleCommand(command);
	} while (!state.shouldExit());
}
