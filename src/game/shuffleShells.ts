import { setIsGameOngoing } from "../stores/gameStore";
import { settingsStore } from "../stores/settingsStore";
import { Ids } from "../types/enums";
import { VirtualPositions } from "../types/types";
import { extractCurrentTranslateX } from "../utils/extractCurrentTranslateX";

import '../styles/game.css';

function calculateNewTranslateXValues(
    firstShellElement: HTMLDivElement,
    secondShellElement: HTMLDivElement,
    firstShellPosition: number,
    secondShellPosition: number,
) {
    // Calculates the distance between each shell
    const distanceToMoveFirst = secondShellPosition - firstShellPosition;
    const distanceToMoveSecond = -distanceToMoveFirst;

    // Gets the actual current translateX after multiple transforms
    const currentTranslateXFirst = extractCurrentTranslateX(firstShellElement);
    const currentTranslateXSecond = extractCurrentTranslateX(secondShellElement);

    // Final values
    const newTranslateXFirst = currentTranslateXFirst + distanceToMoveFirst;
    const newTranslateXSecond = currentTranslateXSecond + distanceToMoveSecond;

    return {
        newTranslateXFirst,
        newTranslateXSecond
    }
}

// Recursive function that runs based on the shuffleNumber set
function shuffle(
    shuffleIndex: number,
    childrenArray: HTMLDivElement[],
    virtualPositions: VirtualPositions,
    callbacksToRunAfterShuffle: () => void
) {
    // we select two random shells ensuring the second isn't the same index 
    const firstRandomShellIndex = Math.floor(Math.random() * childrenArray.length);
    let secondRandomShellIndex: number;

    do {
        secondRandomShellIndex = Math.floor(Math.random() * childrenArray.length);
    } while (secondRandomShellIndex === firstRandomShellIndex);

    const firstShellElement = childrenArray[firstRandomShellIndex];
    const secondShellElement = childrenArray[secondRandomShellIndex];

    const firstShellPosition = virtualPositions[firstRandomShellIndex];
    const secondShellPosition = virtualPositions[secondRandomShellIndex];

    const {
        newTranslateXFirst,
        newTranslateXSecond
    } = calculateNewTranslateXValues(
        firstShellElement,
        secondShellElement,
        firstShellPosition,
        secondShellPosition
    )

    firstShellElement.style.transition = `transform ${settingsStore.speed}ms ease-in-out`;
    secondShellElement.style.transition = `transform ${settingsStore.speed}ms ease-in-out`;

    firstShellElement.style.transform = `translateX(${newTranslateXFirst}px)`;
    secondShellElement.style.transform = `translateX(${newTranslateXSecond}px)`;

    // Store the new swapped positions
    virtualPositions[firstRandomShellIndex] = secondShellPosition;
    virtualPositions[secondRandomShellIndex] = firstShellPosition;

    if (shuffleIndex < settingsStore.shuffleNumber - 1) {
        setTimeout(() => {
            shuffle(shuffleIndex + 1, childrenArray, virtualPositions, callbacksToRunAfterShuffle)
        }, settingsStore.speed);
    } else {
        setTimeout(() => {
            setIsGameOngoing(false);
            callbacksToRunAfterShuffle();
        }, settingsStore.speed);
    }
}

// Responsible for shuffling shells making use of translateX and DOMMatrix
export function startShuffling(callbacksToRunAfterShuffle: () => void): void {
    const virtualPositions: VirtualPositions = {};
    const shellContainer = document.getElementById(Ids.SHELL);

    if (!shellContainer) {
        return;
    };

    const childrenArray = Array.from(shellContainer.children) as HTMLDivElement[];

    // Store the initial positions of the shells
    childrenArray.forEach((child, index) => {
        virtualPositions[index] = child.getBoundingClientRect().left;
    });

    shuffle(0, childrenArray, virtualPositions, callbacksToRunAfterShuffle);
}
