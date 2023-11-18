#include "BoardController.hpp"

#include "WelcomeController.hpp"

WelcomeController::WelcomeController(ProgramState* state)
	: Controller(state)
{
}

void WelcomeController::handleCommand(const std::string& command)
{
	auto state = getProgramState();
	if (command == "start") {
		state->setController(new BoardController(state));
	}
	else if (command == "exit") {
		state->triggerExit();
	}
}

void WelcomeController::handleLoad()
{
	_view.render();
}
