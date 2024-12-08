import { ContainerIds } from "../types/enums";
import { settingsStore } from "../stores/settingsStore";
import { gameStore, setIsGameOngoing } from "../stores/gameStore";
import { shellClickHandler } from "./gameLogic";

// FIXME: Move this to its own component
export function createChances(): HTMLSpanElement | null {
    const chancesContainer = document.createElement('div');
    chancesContainer.id = ContainerIds.CHANCES;

    const chancesSpan = document.createElement('span');
    chancesSpan.id = 'chances';
    chancesSpan.textContent = `${gameStore.chancesLeft} chances left`;
    chancesContainer.appendChild(chancesSpan);

    const gameContainer = document.getElementById(ContainerIds.GAME);
    gameContainer?.appendChild(chancesContainer);

    return chancesSpan;
}

export function createShells(chancesSpan: HTMLSpanElement | null): void {
    const gameContainer = document.getElementById(ContainerIds.GAME);
    let shellContainer = document.getElementById(ContainerIds.SHELL);

    if (!shellContainer) {
        shellContainer = document.createElement('div');
    }

    shellContainer.id = ContainerIds.SHELL;

    for (let i = 0; i < settingsStore.shellNumber; i++) {
        const shell = document.createElement('div');
        shell.classList.add('shell');

        const hat = document.createElement('img');
        hat.src = '/public/hat.svg'; 
        hat.classList.add('hat');
        const line = document.createElement('img');
        line.src = '/public/line.svg';
        line.classList.add('line');
        shell.appendChild(line);
        shell.appendChild(hat);


        shellContainer.appendChild(shell);
        gameStore.shells.push({
            element: shell,
            listener: () => shellClickHandler(i, chancesSpan),
            handlerFn: () => null
        });
    }

    gameContainer?.appendChild(shellContainer);
}

export function shuffleShells(callbacksToRunAfterShuffle: () => void): void {
    const shellContainer = document.getElementById(ContainerIds.SHELL);

    if (!shellContainer) {
        return;
    };

    const childrenArray = Array.from(shellContainer.children) as HTMLDivElement[];

    const performShuffle = (index: number): void => {
        for (let i = childrenArray.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));

            let currentChild = childrenArray[i];
            let randomChild = childrenArray[randomIndex];

            childrenArray[i] = randomChild;
            childrenArray[randomIndex] = currentChild;
        }

        childrenArray.forEach(child => shellContainer.appendChild(child));

        if (index < settingsStore.shuffleNumber - 1) {
            setTimeout(() => performShuffle(index + 1), settingsStore.speed);
        } else {
            setIsGameOngoing(false);
            callbacksToRunAfterShuffle();
        }
    }

    performShuffle(0);
}
