export class GameStats {
    private static instance: GameStats;
    private _playerXWins: number = 0;
    private _playerOWins: number = 0;
    private _draws: number = 0;

    private constructor() {}

    static getInstance(): GameStats {
        if (!GameStats.instance) {
            GameStats.instance = new GameStats();
        }
        return GameStats.instance;
    }

    get playerXWins(): number {
        return this._playerXWins;
    }

    get playerOWins(): number {
        return this._playerOWins;
    }

    get draws(): number {
        return this._draws;
    }

    addWin(player: 'X' | 'O'): void {
        if (player === 'X') {
            this._playerXWins++;
        } else {
            this._playerOWins++;
        }
    }

    addDraw(): void {
        this._draws++;
    }

    reset(): void {
        this._playerXWins = 0;
        this._playerOWins = 0;
        this._draws = 0;
    }
}