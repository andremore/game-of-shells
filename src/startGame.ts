import { Chances } from "./components/Chances";
import { PostGame } from "./components/PostGame";
import { gameState, resetGameState, setBallIndex, setShellsClickHandlers, settings } from "./state";
import { gameIrrelevantClassNames, gameIrrelevantElementIds } from "./constants";
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

function resetGame(userWon: boolean) {
    PostGame(userWon);
    document.getElementById(ContainerIds.SHELL)?.remove();
    document.getElementById(ContainerIds.CHANCES)?.remove();
    resetGameState();
}

const shellClickHandler = (index: number, chancesSpan: HTMLSpanElement | null) => {
    const isCorrectShell = index === gameState.ballIndex;

    if (isCorrectShell) {
        resetGame(isCorrectShell);
        return;
    }

    gameState.chances--;

    if (chancesSpan != null) {
        chancesSpan.textContent = `${gameState.chances} chances left`;
    }

    if (gameState.chances <= 0) {
        resetGame(isCorrectShell);
        return;
    }

    const { element, handlerFn } = gameState.shells[index];

    element.style.backgroundColor = 'red';
    element.removeEventListener('click', handlerFn);
    element.style.cursor = 'auto';

    // TODO: Implement try again message
};


// TODO: Remove after completion, this is for debugging purposes
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function createGameShells(chancesSpan: HTMLSpanElement | null) {
    const container = document.getElementById(ContainerIds.GAME);

    let shellContainer = document.getElementById(ContainerIds.SHELL);

    if (!shellContainer) {
        shellContainer = document.createElement('div');
    }

    shellContainer.id = ContainerIds.SHELL;

    for (let i = 0; i < settings.shellNumber; i++) {
        const shell = document.createElement('div');
        shell.classList.add('shell');
        // TODO: Remove after completion, this is for debugging purposes
        shell.style.backgroundColor = getRandomColor();

        shellContainer.appendChild(shell);
        gameState.shells.push({
            element: shell,
            listener: () => shellClickHandler(i, chancesSpan),
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
    let shellContainer = document.getElementById(ContainerIds.SHELL);

    if (shellContainer == null) {
        return;
    }

    let childrenArray = Array.from(shellContainer.children) as HTMLDivElement[];

    const performShuffle = (i: number) => {
        for (let j = childrenArray.length - 1; j > 0; j--) {
            const randomIndex = Math.floor(Math.random() * (j + 1));

            let currentChild = childrenArray[j];
            let randomChild = childrenArray[randomIndex];

            childrenArray[j] = randomChild;
            childrenArray[randomIndex] = currentChild;
        }

        childrenArray.forEach(child => shellContainer.appendChild(child));

        if (i < settings.shuffleNumber - 1) {
            setTimeout(() => performShuffle(i + 1), settings.speed);
        }
    }

    performShuffle(0);
}

export function startGame() {
    destroyGameIrrelevantElements();

    let chancesSpan: HTMLSpanElement | null = null;
    if (settings.chances > 1) {
        chancesSpan = Chances();
    }

    createGameShells(chancesSpan);
    setBallIndex();
    showBallInShellTemporarily().then(() => {
        shuffleShells();
        setShellsClickHandlers(chancesSpan);
    });
}
