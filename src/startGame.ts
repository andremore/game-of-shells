import { gameState, resetGameState, setBallIndex, setShellsClickHandlers, settings } from "./state";
import { gameIrrelevantElementIds } from "./types/constants";

function destroyGameIrrelevantElements() {
    let i = 0;
    for (; i < gameIrrelevantElementIds.length; i++) {
        const irrelevantElement = document.getElementById(gameIrrelevantElementIds[i]);
        irrelevantElement?.remove();
    }
}

const shellClickHandler = (index: number) => {
    if (index === gameState.ballIndex) {
        resetGameState();
        console.log('you won');
        return;
    }

    console.log('you lost');
    resetGameState();
}

function createGameShells(container: HTMLDivElement) {
    const shellContainer = document.createElement('div');
    shellContainer.className = 'shell-container';

    for (let i = 0; i < settings.shellNumber; i++) {
        const shell = document.createElement('div');

        shell.classList.add('shell');
        shellContainer.appendChild(shell);
        gameState.shells.push({
            element: shell,
            listener: () => shellClickHandler(i),
            handlerFn: () => null
        });
    }

    container.appendChild(shellContainer);
}

function showBallInShellTemporarily(): Promise<void> {
    if (gameState.ballIndex == null) {
        return Promise.resolve();
    }

    const ball = document.createElement('div');
    ball.id = 'ball';

    const shellToAddBall = gameState.shells[gameState.ballIndex].element;

    return new Promise<void>(resolve => {
        setTimeout(() => {
            shellToAddBall.appendChild(ball);

            setTimeout(() => {
                ball.remove();
                resolve();
            }, 1500);
        }, 250);
    });
};

const shuffleShells = () => {
    console.log('shuffle');
}

export function startGame(container: HTMLDivElement) {
    destroyGameIrrelevantElements();
    createGameShells(container);
    setBallIndex();
    showBallInShellTemporarily().then(() => {
        shuffleShells();
        setShellsClickHandlers();
    });
}
