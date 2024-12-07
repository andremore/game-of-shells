import { PostGame } from "../components/PostGame";
import { gameStore, resetGameState } from "../stores/gameStore";

export function shellClickHandler(index: number, chancesSpan: HTMLSpanElement | null): void {
    const isCorrectShell = index === gameStore.ballIndex;

    if (isCorrectShell) {
        resetGame(isCorrectShell);
        return;
    }

    gameStore.chances--;

    if (chancesSpan != null) {
        chancesSpan.textContent = `${gameStore.chances} chances left`;
    }

    if (gameStore.chances <= 0) {
        resetGame(isCorrectShell);
        return;
    }

    const { element, handlerFn } = gameStore.shells[index];

    element.style.backgroundColor = 'red';
    element.removeEventListener('click', handlerFn);
    element.style.cursor = 'auto';

    // TODO: Implement try again message
}

export function resetGame(userWon: boolean): void {
    PostGame(userWon);
    document.getElementById('gameShell')?.remove();
    document.getElementById('gameChances')?.remove();
    resetGameState();
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
