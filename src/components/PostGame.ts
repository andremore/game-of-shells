import { startGame } from "../game/startGame";
import { Classes, Ids } from "../types/enums";

export function PostGame(userWon: boolean) {
    const gameContainer = document.getElementById(Ids.GAME);

    const message = document.createElement('h2');
    message.id = Ids.POST_GAME_MSG;

    let winLoseImage = document.createElement('img');
    winLoseImage.id = Ids.POST_GAME_IMG;
    
    if (userWon) {
        winLoseImage.src = '/winner-santa.svg';
        message.textContent = 'You Won!';
    } else {
        winLoseImage.src = '/loser-santa.svg';
        message.textContent = 'You Lost';
    }

    const btnPlayAgain = document.createElement('button');
    btnPlayAgain.id = Ids.POST_GAME_BTN;
    btnPlayAgain.type = 'button';
    btnPlayAgain.textContent = '⟳ Play Again';
    btnPlayAgain.addEventListener('click', startGame)

    message.classList.add(Classes.POST_GAME);
    btnPlayAgain.classList.add(Classes.POST_GAME);

    gameContainer?.appendChild(winLoseImage);
    gameContainer?.appendChild(message);
    gameContainer?.appendChild(btnPlayAgain);
}
