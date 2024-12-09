import { Chances } from "../components/Chances";
import { setBallIndex, setIsGameOngoing, setShellsClickHandlers } from "../stores/gameStore";
import { settingsStore } from "../stores/settingsStore";
import { destroyGameIrrelevantElements } from "./destroyGameIrrelevantElements";
import { showBallInShellTemporarily } from "./gameLogic";
import { createShells, shuffleShells } from "./gameUI";

// Responsible for starting the game loop when the user clicks either the start or the play again button
export function startGame(): void {
    destroyGameIrrelevantElements();

    const btnRestart = document.getElementById('btn-restart') as HTMLButtonElement;
    btnRestart.disabled = true;

    const btnSettings = document.getElementById('btn-settings') as HTMLButtonElement;
    btnSettings.disabled = true;

    let chancesSpan: HTMLSpanElement | null = null;
    if (settingsStore.chances > 1) {
        chancesSpan = Chances();
    }

    createShells(chancesSpan);
    setBallIndex();
    setIsGameOngoing(true);

    // After the ball is shown temporarily we shuffle the shells and proceed to add the click handler accordingly
    showBallInShellTemporarily().then(() => {
        shuffleShells(() => {
            setShellsClickHandlers(chancesSpan);

            const hats = document.querySelectorAll<HTMLImageElement>('.hat');

            let i = 0;
            for (; i < hats.length; i++) {
                hats[i].dataset.jiggle = 'true';
            }

            btnRestart.disabled = false;
            btnSettings.disabled = false;
        });
    });
}
