#pragma once
#include <memory>
//#include "../Controllers/Controller.hpp"
class Controller;

class ProgramState
{
	Controller* _controller;
	bool _isExiting;
public:
	ProgramState();

	Controller* getController();
	void setController(Controller* controller);

	void triggerExit();
	bool shouldExit() const;
};
