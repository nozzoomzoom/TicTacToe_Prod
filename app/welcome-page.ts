import { EventData, Page, NavigatedData, Frame } from '@nativescript/core';
import { WelcomeViewModel } from './models/welcome-view-model';

let viewModel: WelcomeViewModel;

export function navigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    viewModel = new WelcomeViewModel();
    page.bindingContext = viewModel;
}

export function onStartGame() {
    const playerXName = viewModel.playerXName || 'Joueur X';
    const playerOName = viewModel.playerOName || 'Joueur O';
    
    Frame.topmost().navigate({
        moduleName: 'main-page',
        context: {
            playerXName,
            playerOName
        }
    });
}