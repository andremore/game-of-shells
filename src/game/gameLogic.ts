import { BtnStartGame } from "../components/Button/BtnStartGame";
import { PostGame } from "../components/PostGame";
import { gameStore, resetGameState } from "../stores/gameStore";
import { settingsStore } from "../stores/settingsStore";
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

export function restartGame(addStartGameBtn = false) {
    document.getElementById(ContainerIds.SHELL)?.remove();
    document.getElementById(ContainerIds.CHANCES)?.remove();

    if (addStartGameBtn) {
        const gameContainer = document.getElementById(ContainerIds.GAME);
        gameContainer?.appendChild(BtnStartGame());
    }

    resetGameState();
}

export function endGame(userWon: boolean): void {
    PostGame(userWon);
    restartGame();
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
            shellToAddBall.style.transform = 'translateY(-50%)';

            setTimeout(() => {
                ball.remove();
                shellToAddBall.style.transform = '';
                resolve();
            }, settingsStore.displayBallTTl);
        }, 250);
    });
}
