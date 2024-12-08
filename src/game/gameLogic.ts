import { PostGame } from "../components/PostGame";
import { gameStore, resetGameState } from "../stores/gameStore";

export function shellClickHandler(index: number, chancesSpan: HTMLSpanElement | null): void {
    const isCorrectShell = index === gameStore.ballIndex;

    if (isCorrectShell) {
        endGame(isCorrectShell);
        return;
    }

    gameStore.chancesLeft--;

    if (chancesSpan != null) {
        chancesSpan.textContent = `${gameStore.chancesLeft} chances left`;
    }

    if (gameStore.chancesLeft <= 0) {
        endGame(isCorrectShell);
        return;
    }

    const { element, handlerFn } = gameStore.shells[index];

    element.style.backgroundColor = 'red';
    element.removeEventListener('click', handlerFn);
    element.style.cursor = 'auto';

    // TODO: Implement try again message
}

export function resetGame() {
    // FIXME: These id's
    document.getElementById('gameShell')?.remove();
    document.getElementById('gameChances')?.remove();
    resetGameState();
}

export function endGame(userWon: boolean): void {
    PostGame(userWon);
    resetGame();
}

export function showBallInShellTemporarily(): Promise<void> {
    if (gameStore.ballIndex == null) {
        return Promise.resolve();
    }

    const ball = document.createElement('div');
    ball.id = 'ball';

    const shellToAddBall = gameStore.shells[gameStore.ballIndex].element;

    return new Promise<void>((resolve) => {
        setTimeout(() => {
            shellToAddBall.appendChild(ball);

            setTimeout(() => {
                ball.remove();
                resolve();
            }, 1500);
        }, 250);
    });
}
