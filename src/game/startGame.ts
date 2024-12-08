import { BtnRestart } from "../components/Button/BtnRestart";
import { gameStore, setBallIndex, setIsGameOngoing, setShellsClickHandlers } from "../stores/gameStore";
import { settingsStore } from "../stores/settingsStore";
import { destroyGameIrrelevantElements } from "./destroyGameIrrelevantElements";
import { resetGame, showBallInShellTemporarily } from "./gameLogic";
import { createChances, createShells, shuffleShells } from "./gameUI";

export function startGame(): void {
    destroyGameIrrelevantElements();

    let chancesSpan: HTMLSpanElement | null = null;
    if (settingsStore.chances > 1) {
        chancesSpan = createChances();
    }

    const btnSettings = document.getElementById('btn-settings') as HTMLButtonElement;
    btnSettings.style.display = 'none';

    createShells(chancesSpan);
    setBallIndex();

    let btnRestart: HTMLButtonElement;

    if (!document.querySelector('#btn-restart')) {
        const header = document.querySelector('header');
        btnRestart = BtnRestart();

        header?.appendChild(btnRestart);
    }

    btnRestart = document.getElementById('btn-restart') as HTMLButtonElement;
    btnRestart.style.display = 'block';

    setIsGameOngoing(true);
    showBallInShellTemporarily().then(() => {
        shuffleShells(() => {
            setShellsClickHandlers(chancesSpan);

            btnRestart.addEventListener('click', () => {
                if (gameStore.isGameOngoing) {
                    return;
                }

                resetGame(btnSettings, btnRestart);

                document.getElementById('post-game-msg')?.remove();
                document.getElementById('post-game-btn')?.remove();
            });
        });
    });
}
