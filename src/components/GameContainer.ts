import { ContainerIds } from "../types/enums";
import { BtnStartGame } from "./Button/BtnStartGame";

export function GameContainer() {
    const gameContainer = document.createElement('div');
    gameContainer.id = ContainerIds.GAME;
    gameContainer.appendChild(BtnStartGame());

    return gameContainer;
}
