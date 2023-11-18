#include "BoardViewModel.hpp"

std::string BoardViewModel::getError()
{
	std::string error = _error;
	_error = "";
	return error;
}

bool BoardViewModel::hasError() const
{
	return !_error.empty();
}

void BoardViewModel::setError(const std::string& message)
{
	_error = message;
}
