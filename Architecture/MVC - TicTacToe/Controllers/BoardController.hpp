#pragma once
#include "../Models/BoardViewModel.hpp"
#include "../Views/BoardView.hpp"
#include "Controller.hpp"

class BoardController : public Controller
{
	BoardView _view;
	BoardViewModel _model;
public:
	BoardController(ProgramState*);
	void handleCommand(const std::string& command);
	void handleLoad();
private:
	std::pair<int, int> parseCoords(const std::string& command);
};
