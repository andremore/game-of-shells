import { GameStore } from "../types/types";
import { settingsStore } from "./settingsStore";

export const gameStore: GameStore = {
    shells: [],
    ballIndex: null,
    chances: settingsStore.chances
};

export function setChances(chances: number) {
    gameStore.chances = chances;
}

export function setBallIndex() {
    gameStore.ballIndex = Math.floor(Math.random() * gameStore.shells.length);
}

export function setShellsClickHandlers(chancesSpan: HTMLSpanElement | null) {
    if (!gameStore.shells.length) {
        return;
    }

    for (let i = 0; i < gameStore.shells.length; i++) {
        const handlerFn = () => {
            gameStore.shells[i].listener(i, chancesSpan);
        };

        gameStore.shells[i].handlerFn = handlerFn;
        gameStore.shells[i].element.addEventListener('click', handlerFn);
    }
}

export function resetGameState() {
    let i = 0;
    for (; i < gameStore.shells.length; i++) {
        gameStore.shells[i].element.removeEventListener(
            'click',
            gameStore.shells[i].handlerFn
        );

        gameStore.shells[i].element.remove();
    }

    gameStore.shells = [];
    gameStore.ballIndex = null;
    gameStore.chances = settingsStore.chances;
}