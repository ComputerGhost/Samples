#pragma once
#include <string>

#include "../Models/ProgramState.hpp"

class Controller
{
private:
	ProgramState* _programState;
public:
	Controller(ProgramState* state);
	virtual void handleCommand(const std::string &) = 0;
	virtual void handleLoad() = 0;
protected:
	ProgramState* getProgramState();
};
