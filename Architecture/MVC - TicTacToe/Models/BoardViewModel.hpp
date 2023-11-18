#pragma once
#include <string>

#include "BoardModel.hpp"

class BoardViewModel : public BoardModel
{
	std::string _error;
public:
	std::string getError();
	bool hasError() const;
	void setError(const std::string& message);
};
