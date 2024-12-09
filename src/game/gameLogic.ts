import { GameContainer } from "../components/GameContainer";
import { PostGame } from "../components/PostGame";
import { gameStore, resetGameState } from "../stores/gameStore";
import { settingsStore } from "../stores/settingsStore";
import { Ids } from "../types/enums";

// Runs after the user tries to guess the shell and he doesn't have any chances left if any
function endGame(userWon: boolean): void {
    PostGame(userWon);
    restartGame();
}

export function guessHandler(clickedIndex: number, chancesSpan: HTMLSpanElement | null): void {
    const isCorrectShell = clickedIndex === gameStore.ballIndex;

    if (isCorrectShell) {
        endGame(isCorrectShell);
        return;
    }

    gameStore.chancesLeft--;

    if (chancesSpan != null) {
        chancesSpan.textContent = `${gameStore.chancesLeft} chances left`;
    }

    const { element, handlerFn } = gameStore.shells[clickedIndex];

    if (!gameStore.chancesLeft) {
        endGame(isCorrectShell);
        return;
    } else {
        // Responsible to visually display previously wrongly guesses
        element.style.filter = 'grayscale(1)';

        const hat = element.children[0] as HTMLImageElement;
        hat.dataset.jiggle = 'false';
    }

    element.style.backgroundColor = 'red';
    element.removeEventListener('click', handlerFn);
    element.style.cursor = 'auto';
}

// Either runs when the user explictly chooses to restart or the game ends
export function restartGame(addStartGameBtn = false) {
    document.getElementById(Ids.SHELL)?.remove();
    document.getElementById(Ids.CHANCES)?.remove();

    if (addStartGameBtn) {
        document.getElementById(Ids.GAME)?.remove();

        const mainContainer = document.getElementsByTagName('main')[0];
        mainContainer?.appendChild(GameContainer());
    }

    resetGameState();
}

// Initial ball display based on display ball time to leave setting and chosen shell
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
};

