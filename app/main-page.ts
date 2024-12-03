import { EventData, Page, NavigatedData, Frame } from '@nativescript/core';
import { GameState } from './models/game-state';

let gameState: GameState;

export function navigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    const context = args.context;
    gameState = new GameState(context.playerXName, context.playerOName);
    page.bindingContext = gameState;
}

export function onCellTap(args: EventData) {
    const button = args.object as any;
    const row = parseInt(button.get('data-row'), 10);
    const col = parseInt(button.get('data-col'), 10);
    gameState.makeMove(row, col);
}

export function onResetGame() {
    gameState.resetGame();
}

export function onResetStats() {
    gameState.resetStats();
}

export function onResetPlayers() {
    Frame.topmost().navigate({
        moduleName: 'welcome-page',
        clearHistory: true
    });
}