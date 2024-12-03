import { Observable } from '@nativescript/core';

export class WelcomeViewModel extends Observable {
    private _playerXName: string = '';
    private _playerOName: string = '';

    get playerXName(): string {
        return this._playerXName;
    }

    set playerXName(value: string) {
        if (this._playerXName !== value) {
            this._playerXName = value;
            this.notifyPropertyChange('playerXName', value);
        }
    }

    get playerOName(): string {
        return this._playerOName;
    }

    set playerOName(value: string) {
        if (this._playerOName !== value) {
            this._playerOName = value;
            this.notifyPropertyChange('playerOName', value);
        }
    }
}