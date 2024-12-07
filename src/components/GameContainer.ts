import { ContainerIds } from "../types/enums";
import { BtnStartGame } from "./BtnStartGame";

export function GameContainer() {
    const container = document.createElement('div');
    container.id = ContainerIds.GAME;
    container.appendChild(BtnStartGame());

    return container;
}
