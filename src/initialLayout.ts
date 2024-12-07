import { startGame } from "./startGame";
import { settings } from "./state";

export function initialLayout(root: HTMLDivElement) {
  const container = document.createElement('div');
  root.appendChild(container);

  const title = document.createElement('h1');
  title.textContent = 'Game of Shells';
  container.appendChild(title);

  const btnStartGame = document.createElement('button');
  btnStartGame.type = 'button';
  btnStartGame.textContent = 'Start Game';
  btnStartGame.addEventListener('click', () => startGame(settings));
  container.appendChild(btnStartGame);

  const btnSettings = document.createElement('button');
  btnSettings.type = 'button';
  btnSettings.textContent = '⚙';
  root.appendChild(btnSettings);
}
