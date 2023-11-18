#include <iostream>

#include "WelcomeView.hpp"

void WelcomeView::render()
{
	std::cout << "=======================" << std::endl;
	std::cout << "Welcome to Tic Tac Toe!" << std::endl;
	std::cout << "=======================" << std::endl;
	std::cout << "Type \"start\" to start." << std::endl;
	std::cout << "Type \"exit\" to exit." << std::endl;
}
