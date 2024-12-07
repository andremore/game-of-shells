import { PostGame } from "./components/PostGame";
import { gameState, resetGameState, setBallIndex, setShellsClickHandlers, settings } from "./state";
import { gameIrrelevantClassNames, gameIrrelevantElementIds } from "./types/constants";
import { ContainerIds } from "./types/enums";

function destroyGameIrrelevantElements() {
    let i = 0;
    for (; i < gameIrrelevantElementIds.length; i++) {
        document.getElementById(gameIrrelevantElementIds[i])?.remove();
    }

    let j = 0;
    for (; j < gameIrrelevantClassNames.length; j++) {
        document.querySelectorAll(gameIrrelevantClassNames[j]).forEach(el => el.remove());
    }
}

const shellClickHandler = (index: number) => {
    PostGame(index === gameState.ballIndex);
    document.getElementById(ContainerIds.SHELL)?.remove();
    resetGameState();
}

function createGameShells() {
    const container = document.getElementById(ContainerIds.GAME);

    let shellContainer = document.getElementById(ContainerIds.SHELL);

    if (!shellContainer) {
        shellContainer = document.createElement('div');
    }

    shellContainer.id = ContainerIds.SHELL;

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

    container?.appendChild(shellContainer);
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

export function startGame() {
    destroyGameIrrelevantElements();
    createGameShells();
    setBallIndex();
    showBallInShellTemporarily().then(() => {
        shuffleShells();
        setShellsClickHandlers();
    });
}
