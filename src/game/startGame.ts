import { destroyGameIrrelevantElements } from "./destroyGameIrrelevantElements";
import { showBallInShellTemporarily } from "./gameLogic";
import { createChances, createShells, shuffleShells } from "./gameUI";
import { setBallIndex, setShellsClickHandlers } from "../stores/gameStore";
import { settingsStore } from "../stores/settingsStore";

export function startGame(): void {
    destroyGameIrrelevantElements();

    let chancesSpan: HTMLSpanElement | null = null;
    if (settingsStore.chances > 1) {
        chancesSpan = createChances();
    }

    createShells(chancesSpan);
    setBallIndex();
    showBallInShellTemporarily().then(() => {
        shuffleShells();
        setShellsClickHandlers(chancesSpan);
    });
}
