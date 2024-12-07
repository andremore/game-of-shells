import { startGame } from "../startGame";
import { root } from "../constants";
import { ContainerIds } from "../types/enums";

export function MainLayout() {
  const title = document.createElement('h1');
  title.textContent = 'Game of Shells';
  title.id = 'title';

  const container = document.createElement('div');
  container.id = ContainerIds.GAME;

  const btnStartGame = document.createElement('button');
  btnStartGame.type = 'button';
  btnStartGame.id = ContainerIds.START_GAME;
  btnStartGame.textContent = 'Start Game';
  btnStartGame.addEventListener('click', startGame);

  const btnSettings = document.createElement('button');
  btnSettings.type = 'button';
  btnSettings.textContent = '⚙';

  root?.appendChild(title);
  root?.appendChild(container);
  container.appendChild(btnStartGame);
  root?.appendChild(btnSettings);
}
