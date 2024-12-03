import { Observable, EventData, View } from '@nativescript/core';
import { GameState } from '../models/game-state';

export class GameBoard extends Observable {
    private gameState: GameState;

    constructor(playerXName: string, playerOName: string) {
        super();
        this.gameState = new GameState(playerXName, playerOName);
    }

    get board() {
        return this.gameState.board;
    }

    get status() {
        return this.gameState.status;
    }

    makeMove(args: EventData) {
        const button = args.object as View;
        const row = parseInt(button.get('data-row'), 10);
        const col = parseInt(button.get('data-col'), 10);
        
        this.gameState.makeMove(row, col);
        this.notifyPropertyChange('board', this.board);
        this.notifyPropertyChange('status', this.status);
    }

    resetGame() {
        this.gameState.resetGame();
        this.notifyPropertyChange('board', this.board);
        this.notifyPropertyChange('status', this.status);
    }

    isCellWinner(row: number, col: number): boolean {
        return this.gameState.isCellWinner(row, col);
    }
}