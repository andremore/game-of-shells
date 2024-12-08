import { ContainerIds } from "../types/enums";
import { settingsStore } from "../stores/settingsStore";
import { gameStore, setIsGameOngoing } from "../stores/gameStore";
import { shellClickHandler } from "./gameLogic";

// FIXME: Move this to its own component
export function createChances(): HTMLSpanElement | null {
    if (!document.getElementById('chances')) {
        const chancesContainer = document.createElement('div');
        chancesContainer.id = ContainerIds.CHANCES;
    
        const chancesSpan = document.createElement('span');
        chancesSpan.id = 'chances';
        chancesSpan.textContent = `${gameStore.chancesLeft} chances left`;
        chancesContainer.appendChild(chancesSpan);
    
        const container = document.getElementById(ContainerIds.GAME);
        container?.appendChild(chancesContainer);

        return chancesSpan;
    }

    const chancesSpan = document.getElementById('chances') as HTMLSpanElement;
    chancesSpan.textContent = `${gameStore.chancesLeft} chances left`;

    return chancesSpan;
}

export function createShells(chancesSpan: HTMLSpanElement | null): void {
    const container = document.getElementById(ContainerIds.GAME);
    let shellContainer = document.getElementById(ContainerIds.SHELL);

    if (!shellContainer) {
        shellContainer = document.createElement('div');
    }

    shellContainer.id = ContainerIds.SHELL;

    for (let i = 0; i < settingsStore.shellNumber; i++) {
        const shell = document.createElement('div');
        shell.classList.add('shell');
        shell.style.backgroundColor = getRandomColor(); // You can remove this line for production

        shellContainer.appendChild(shell);
        gameStore.shells.push({
            element: shell,
            listener: () => shellClickHandler(i, chancesSpan),
            handlerFn: () => null
        });
    }

    container?.appendChild(shellContainer);
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

// TODO: Remove after completion, this is for debugging purposes
function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
