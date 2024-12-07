import { startGame } from "../game/startGame";
import { ContainerIds } from "../types/enums";

export function BtnStartGame() {
  const btnStartGame = document.createElement('button');
  btnStartGame.type = 'button';
  btnStartGame.id = ContainerIds.START_GAME;
  btnStartGame.textContent = 'Start Game';
  btnStartGame.addEventListener('click', startGame);

  return btnStartGame;
}