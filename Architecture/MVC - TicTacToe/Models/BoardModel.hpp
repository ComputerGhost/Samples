#pragma once

class BoardModel
{
	char _turn = 'X';
	char _board[3 * 3];
public:
	void set(int row, int column);
	const char* getBoard() const;
	char getTurn() const;

	bool isWin() const;
	bool isLose() const;
};
