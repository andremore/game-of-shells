import { Ids } from "../types/enums";
import { BtnStartGame } from "./Button/BtnStartGame";

export function GameContainer() {
    const gameContainer = document.createElement('div');
    gameContainer.id = Ids.GAME;

    const santa = document.createElement('img');
    santa.src ='/start-game-santa.svg';
    santa.id = 'start-game-santa';

    gameContainer.appendChild(santa);
    gameContainer.appendChild(BtnStartGame());

    return gameContainer;
}
