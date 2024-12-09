import { GameStoreKeys } from "../types/enums";
import { GameStore } from "../types/types";
import { settingsStore } from "./settingsStore";

export const gameStore: GameStore = {
    shells: [],
    ballIndex: null,
    chancesLeft: settingsStore.chances,
    isGameOngoing: false
};

function setGameStore<T extends keyof GameStore>(key: T, value: GameStore[T]) {
    gameStore[key] = value;
}

export function setIsGameOngoing(isShuffling: boolean) {
    setGameStore(GameStoreKeys.IS_GAME_ON_GOING, isShuffling);
}

export function setChancesLeft(chancesLeft: number) {
    setGameStore(GameStoreKeys.CHANCES_LEFT, chancesLeft);
}

export function setBallIndex() {
    setGameStore(GameStoreKeys.BALL_INDEX, Math.floor(Math.random() * gameStore.shells.length));
}

// We save the shell click handlers in state to keep their reference
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
    gameStore.chancesLeft = settingsStore.chances;
    gameStore.isGameOngoing = false;
}
