import { BtnStartGame } from "../components/Button/BtnStartGame";
import { PostGame } from "../components/PostGame";
import { gameStore, resetGameState } from "../stores/gameStore";
import { ContainerIds } from "../types/enums";

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
}

export function resetGame(btnSettings?: HTMLButtonElement, btnRestart?: HTMLButtonElement) {
    document.getElementById(ContainerIds.SHELL)?.remove();
    document.getElementById(ContainerIds.CHANCES)?.remove();

    if (btnSettings && btnRestart) {
        btnSettings.style.display = 'block';
        btnRestart.style.display = 'none';
    }

    if (
        !document.getElementById(ContainerIds.START_GAME)
        && !document.getElementById('post-game-msg')
    ) {
        const gameContainer = document.getElementById(ContainerIds.GAME);
        gameContainer?.appendChild(BtnStartGame());
    }

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

    const ball = document.createElement('img');
    ball.src = '/ball.svg';
    ball.id = 'ball';

    const shellToAddBall = gameStore.shells[gameStore.ballIndex].element;

    return new Promise<void>((resolve) => {
        setTimeout(() => {
            shellToAddBall.appendChild(ball);
            shellToAddBall.style.transform = 'translateY(-50px)';

            setTimeout(() => {
                ball.remove();
                shellToAddBall.style.transform = '';
                resolve();
            }, 1500);
        }, 250);
    });
}
