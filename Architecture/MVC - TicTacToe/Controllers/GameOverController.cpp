#include "BoardController.hpp"

#include "GameOverController.hpp"

GameOverController::GameOverController(ProgramState* state)
	: Controller(state)
{
}

void GameOverController::handleCommand(const std::string& command)
{
}

void GameOverController::handleLoad()
{
	_view.render();
	getProgramState()->triggerExit();
}
