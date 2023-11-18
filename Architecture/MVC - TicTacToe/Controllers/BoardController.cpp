#include "GameOverController.hpp"

#include "BoardController.hpp"

BoardController::BoardController(ProgramState* programState) :
	Controller(programState)
{
}

void BoardController::handleCommand(const std::string& command)
{
	auto coords = parseCoords(command);

	if (!_model.hasError()) {
		_model.set(coords.first, coords.second);
	}

	if (_model.isLose() || _model.isWin()) {
		auto state = getProgramState();
		state->setController(new GameOverController(state));
	}
	else {
		_view.render();
	}
}

void BoardController::handleLoad()
{
	_view.render();
}

std::pair<int, int> BoardController::parseCoords(const std::string& command)
{
	const std::pair<int, int> errorPair(-1, -1);

	auto splitPos = command.find(' ');
	if (splitPos == std::string::npos) {
		_model.setError("The syntax is: {column} {row}");
		return errorPair;
	}

	int x = atoi(command.substr(0, splitPos).c_str());
	int y = atoi(command.substr(splitPos).c_str());
	if (x == 0 || y == 0) {
		_model.setError("The column and row must be from 1 to 3.");
		return errorPair;
	}

	return std::make_pair(x, y);
}

