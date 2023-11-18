#include <stdexcept>

#include "BoardModel.hpp"

void BoardModel::set(int row, int column)
{
	if (row < 0 || row >= 3) {
		throw new std::out_of_range("row");
	}
	if (column < 0 || column >= 3) {
		throw new std::out_of_range("column");
	}
	_board[row * 3 + column] = _turn;
	_turn = (_turn == 'X') ? 'O' : 'X';
}

const char* BoardModel::getBoard() const
{
	return _board;
}

char BoardModel::getTurn() const
{
	return _turn;
}

bool BoardModel::isWin() const
{
	return false;
}

bool BoardModel::isLose() const
{
	return true;
}
