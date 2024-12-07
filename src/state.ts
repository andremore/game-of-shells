import { settingsMap, normalSettings } from "./constants";
import { DifficultySettings } from "./types/enums";
import { GameState, Settings } from "./types/types";

export let settings: Settings = normalSettings;

export function setSettings(difficulty: DifficultySettings) {
    settings = settingsMap[difficulty];
    gameState.chances = settingsMap[difficulty].chances;
}

export const gameState: GameState = {
    shells: [],
    ballIndex: null,
    chances: settings.chances
};

export function setBallIndex() {
    gameState.ballIndex = Math.floor(Math.random() * gameState.shells.length);
}

export function setShellsClickHandlers(chancesSpan: HTMLSpanElement | null) {
    if (!gameState.shells.length) {
        return;
    }

    for (let i = 0; i < gameState.shells.length; i++) {
        const handlerFn = () => {
            gameState.shells[i].listener(i, chancesSpan);
        };

        gameState.shells[i].handlerFn = handlerFn;
        gameState.shells[i].element.addEventListener('click', handlerFn);
    }
}

export function resetGameState() {
    let i = 0;
    for (; i < gameState.shells.length; i++) {
        gameState.shells[i].element.removeEventListener(
            'click',
            gameState.shells[i].handlerFn
        );

        gameState.shells[i].element.remove();
    }

    gameState.shells = [];
    gameState.ballIndex = null;
    gameState.chances = settings.chances;
}
