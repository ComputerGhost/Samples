#include "../Controllers/Controller.hpp"
#include "ProgramState.hpp"

ProgramState::ProgramState() :
	_controller(nullptr),
	_isExiting(false)
{
}

Controller* ProgramState::getController()
{
	return _controller;
}

void ProgramState::setController(Controller* controller)
{
	if (_controller != nullptr) {
		delete _controller;
	}
	_controller = controller;
}

void ProgramState::triggerExit()
{
	_isExiting = true;
}

bool ProgramState::shouldExit() const
{
	return _isExiting;
}

