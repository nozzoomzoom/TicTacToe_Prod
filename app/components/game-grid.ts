import { View, Property } from '@nativescript/core';
import { Cell } from '../models/cell';

export const boardProperty = new Property<GameGrid, string[][]>({
    name: 'board',
    defaultValue: undefined
});

export class GameGrid extends View {
    board: string[][];
    cells: Cell[] = [];

    constructor() {
        super();
        this.updateCells();
    }

    onCellTap(args: any) {
        const context = args.object.bindingContext;
        if (this.notify) {
            this.notify({
                eventName: 'cellTap',
                object: this,
                row: context.row,
                col: context.col
            });
        }
    }

    [boardProperty.setNative](value: string[][]) {
        this.board = value;
        this.updateCells();
    }

    private updateCells() {
        if (!this.board) return;
        
        this.cells = [];
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                this.cells.push(new Cell(row, col, this.board[row][col]));
            }
        }
        this.notifyPropertyChange('cells', this.cells);
    }
}

GameGrid.prototype.recycleNativeView = 'auto';
boardProperty.register(GameGrid);