import { settings } from "./state";
import { gameIrrelevantElementIds } from "./types/constants";

function destroyGameIrrelevantElements() {
    let i = 0;
    for (; i < gameIrrelevantElementIds.length; i++) {
        const irrelevantElement = document.getElementById(gameIrrelevantElementIds[i]);
        irrelevantElement?.remove();
    }
}

function createGameShells(container: HTMLDivElement) {
    const shellContainer = document.createElement('div');
    shellContainer.className = 'shell-container';

    for (let i = 0; i < settings.shellNumber; i++) {
        const shell = document.createElement('div');

        shell.classList.add('shell');
        shell.addEventListener('click', () => console.log(`${i} shell clicked`));
        shellContainer.appendChild(shell);
    }

    container.appendChild(shellContainer);
}

export function startGame(container: HTMLDivElement) {
    destroyGameIrrelevantElements();
    createGameShells(container);
}
