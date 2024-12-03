import { WINNING_LINES } from './constants';

export interface WinningCell {
    row: number;
    col: number;
}

export function checkWinner(board: string[][]): WinningCell[] | null {
    for (const line of WINNING_LINES) {
        const [[r1,c1], [r2,c2], [r3,c3]] = line;
        if (board[r1][c1] !== '' &&
            board[r1][c1] === board[r2][c2] &&
            board[r2][c2] === board[r3][c3]) {
            return [
                { row: r1, col: c1 },
                { row: r2, col: c2 },
                { row: r3, col: c3 }
            ];
        }
    }
    return null;
}

export function isBoardFull(board: string[][]): boolean {
    return board.every(row => row.every(cell => cell !== ''));
}

export function createEmptyBoard(): string[][] {
    return [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
}