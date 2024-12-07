import { defaultSettings } from "./types/constants";
import { GameState, Settings } from "./types/types";

export const settings: Settings = defaultSettings;

export const gameState: GameState = {
    shells: [],
    ballIndex: null,
};

export function setBallIndex() {
    gameState.ballIndex = Math.floor(Math.random() * gameState.shells.length);
}

export function setShellsClickHandlers() {
    if (!gameState.shells.length) {
        return;
    }

    for (let i = 0; i < gameState.shells.length; i++) {
        const handlerFn = () => {
            gameState.shells[i].listener(i);
        };

        gameState.shells[i].handlerFn = handlerFn;
        gameState.shells[i].element.addEventListener('click', handlerFn);
    }
}

export function resetGameState() {
    let i = 0;
    for (; i < gameState.shells.length; i++) {
        gameState.shells[i].element.removeEventListener('click', gameState.shells[i].handlerFn);
    }
}