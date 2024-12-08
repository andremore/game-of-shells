import { BtnRestart } from "../components/Button/BtnRestart";
import { BtnStartGame } from "../components/Button/BtnStartGame";
import { setBallIndex, setShellsClickHandlers } from "../stores/gameStore";
import { settingsStore } from "../stores/settingsStore";
import { ContainerIds } from "../types/enums";
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
    showBallInShellTemporarily().then(() => {
        shuffleShells();
        setShellsClickHandlers(chancesSpan);
    });

    if (!document.querySelector('#btn-restart')) {
        const header = document.querySelector('header');
        const btnRestart = BtnRestart();

        btnRestart.addEventListener('click', () => {
            resetGame();

            const postGameMsg = document.getElementById('post-game-msg');
            const postGameBtn = document.getElementById('post-game-btn');
            postGameMsg?.remove();
            postGameBtn?.remove();

            btnSettings.style.display = 'block';
            btnRestart.style.display = 'none';

            const container = document.getElementById(ContainerIds.GAME);
            container?.appendChild(BtnStartGame());
        });

        header?.appendChild(btnRestart);
        return;
    }

    const btnRestart = document.getElementById('btn-restart') as HTMLButtonElement;
    btnRestart.style.display = 'block';
}
