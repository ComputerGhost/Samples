#include "Controller.hpp"

Controller::Controller(ProgramState* state) :
	_programState(state)
{
}

ProgramState* Controller::getProgramState()
{
	return _programState;
}
