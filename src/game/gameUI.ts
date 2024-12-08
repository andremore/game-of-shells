import { ContainerIds } from "../types/enums";
import { settingsStore } from "../stores/settingsStore";
import { gameStore, setIsGameOngoing } from "../stores/gameStore";
import { shellClickHandler } from "./gameLogic";
import { VirtualPositions } from "../types/types";

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
        hat.src = '/hat.svg';
        hat.classList.add('hat');
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

const extractCurrentTranslateX = (element: HTMLElement): number => {
    const transform = window.getComputedStyle(element).transform;

    if (transform === "none") {
        return 0;
    }

    console.log(transform);

    const matrix = new DOMMatrix(transform);
    return matrix.m41;
};

export function shuffleShells(callbacksToRunAfterShuffle: () => void): void {
    const virtualPositions: VirtualPositions = {};
    const shellContainer = document.getElementById(ContainerIds.SHELL);

    if (!shellContainer) {
        return;
    };

    const childrenArray = Array.from(shellContainer.children) as HTMLDivElement[];

    childrenArray.forEach((child, index) => {
        virtualPositions[index] = child.getBoundingClientRect().left;
    });

    const performShuffle = (shuffleIndex: number): void => {
        const firstRandomShellIndex = Math.floor(Math.random() * childrenArray.length);
        let secondRandomShellIndex: number;

        do {
            secondRandomShellIndex = Math.floor(Math.random() * childrenArray.length);
        } while (secondRandomShellIndex === firstRandomShellIndex);

        const firstShellElement = childrenArray[firstRandomShellIndex];
        const secondShellElement = childrenArray[secondRandomShellIndex];

        const firstShellPosition = virtualPositions[firstRandomShellIndex];
        const secondShellPosition = virtualPositions[secondRandomShellIndex];

        const distanceToMoveFirst = secondShellPosition - firstShellPosition;
        const distanceToMoveSecond = -distanceToMoveFirst;

        const currentTranslateXFirst = extractCurrentTranslateX(firstShellElement);
        const currentTranslateXSecond = extractCurrentTranslateX(secondShellElement);

        const newTranslateXFirst = currentTranslateXFirst + distanceToMoveFirst;
        const newTranslateXSecond = currentTranslateXSecond + distanceToMoveSecond;

        firstShellElement.style.transition = `transform ${settingsStore.speed}ms ease-in-out`;
        secondShellElement.style.transition = `transform ${settingsStore.speed}ms ease-in-out`;

        firstShellElement.style.transform = `translateX(${newTranslateXFirst}px)`;
        secondShellElement.style.transform = `translateX(${newTranslateXSecond}px)`;

        virtualPositions[firstRandomShellIndex] = secondShellPosition;
        virtualPositions[secondRandomShellIndex] = firstShellPosition;

        if (shuffleIndex < settingsStore.shuffleNumber - 1) {
            setTimeout(() => performShuffle(shuffleIndex + 1), settingsStore.speed);
        } else {
            setTimeout(() => {
                console.log('swap');
                setIsGameOngoing(false);
                callbacksToRunAfterShuffle();
            }, settingsStore.speed);
        }
    }

    performShuffle(0);
}
