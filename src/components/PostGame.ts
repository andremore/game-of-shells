import { startGame } from "../game/startGame";
import { ContainerIds } from "../types/enums";

export function PostGame(userWon: boolean) {
    const container = document.getElementById(ContainerIds.GAME);

    const message = document.createElement('h2');
    message.id = 'post-game-msg';

    if (userWon) {
        message.textContent = 'You Won!';
    } else {
        message.textContent = 'You Lost';
    }

    const btnPlayAgain = document.createElement('button');
    btnPlayAgain.id = 'post-game-btn';
    btnPlayAgain.type = 'button';
    btnPlayAgain.textContent = '⟳ Play Again';
    btnPlayAgain.addEventListener('click', startGame)

    message.classList.add('post-game');
    btnPlayAgain.classList.add('post-game');

    container?.appendChild(message);
    container?.appendChild(btnPlayAgain);
}
