#pragma once
#include "../Views/WelcomeView.hpp"
#include "Controller.hpp"

class WelcomeController : public Controller
{
	WelcomeView _view;
public:
	WelcomeController(ProgramState*);
	void handleCommand(const std::string& command);
	void handleLoad();
};
