import { Observable } from '@nativescript/core';
import { checkWinner, isBoardFull, createEmptyBoard, WinningCell } from '../utils/game-logic';
import { Player } from './types';
import { GameStats } from './game-stats';

export class GameState extends Observable {
    private _board: string[][];
    private _currentPlayer: Player;
    private _gameOver: boolean;
    private _winner: Player | null;
    private _winningCells: WinningCell[];
    private _playerXName: string;
    private _playerOName: string;
    private _lastPlayer: Player;
    private _gameStats: GameStats;

    constructor(playerXName: string, playerOName: string) {
        super();
        this._playerXName = playerXName;
        this._playerOName = playerOName;
        this._gameStats = GameStats.getInstance();
        this.resetGame();
    }

    get board(): string[][] {
        return this._board;
    }

    get playerXName(): string {
        return this._playerXName;
    }

    get playerOName(): string {
        return this._playerOName;
    }

    get status(): string {
        if (this._winner) {
            const winnerName = this._winner === 'X' ? this._playerXName : this._playerOName;
            const nextPlayerName = this._winner === 'X' ? this._playerOName : this._playerXName;
            return `${winnerName} gagne ! ${nextPlayerName} commence`;
        } else if (this._gameOver) {
            const nextPlayerName = this._lastPlayer === 'X' ? this._playerXName : this._playerOName;
            return `Match nul ! ${nextPlayerName} commence`;
        } else {
            const currentPlayerName = this._currentPlayer === 'X' ? this._playerXName : this._playerOName;
            return `Tour de ${currentPlayerName}`;
        }
    }

    get stats(): GameStats {
        return this._gameStats;
    }

    isCellWinner(row: number, col: number): boolean {
        return this._winningCells?.some(cell => cell.row === row && cell.col === col) || false;
    }

    makeMove(row: number, col: number): void {
        if (this._gameOver || this._board[row][col] !== '') {
            return;
        }

        this._board[row][col] = this._currentPlayer;
        this._lastPlayer = this._currentPlayer;
        this.notifyPropertyChange('board', this._board);

        const winningLine = checkWinner(this._board);
        if (winningLine) {
            this._winner = this._currentPlayer;
            this._gameOver = true;
            this._winningCells = winningLine;
            this._gameStats.addWin(this._currentPlayer);
            this.notifyPropertyChange('board', this._board);
            this.notifyPropertyChange('stats', this._gameStats);
        } else if (isBoardFull(this._board)) {
            this._gameOver = true;
            this._gameStats.addDraw();
            this.notifyPropertyChange('stats', this._gameStats);
        } else {
            this._currentPlayer = this._currentPlayer === 'X' ? 'O' : 'X';
        }

        this.notifyPropertyChange('status', this.status);
    }

    resetGame(): void {
        this._board = createEmptyBoard();
        
        if (this._winner) {
            this._currentPlayer = this._winner === 'X' ? 'O' : 'X';
        } else if (this._gameOver && this._lastPlayer) {
            this._currentPlayer = this._lastPlayer;
        } else {
            this._currentPlayer = 'X';
        }

        this._gameOver = false;
        this._winner = null;
        this._winningCells = [];
        
        this.notifyPropertyChange('board', this._board);
        this.notifyPropertyChange('status', this.status);
    }

    resetStats(): void {
        this._gameStats.reset();
        this.notifyPropertyChange('stats', this._gameStats);
    }
}