#pragma once
#include "../Views/GameOverView.hpp"
#include "Controller.hpp"

class GameOverController : public Controller
{
	GameOverView _view;
public:
	GameOverController(ProgramState*);
	void handleCommand(const std::string& command);
	void handleLoad();
};
