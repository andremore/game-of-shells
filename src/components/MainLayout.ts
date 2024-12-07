import { startGame } from "../startGame";
import { settingsMap, root } from "../constants";
import { ContainerIds, DifficultySettings } from "../types/enums";
import { setSettings } from "../stores/settingsStore";

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

  const difficultyContainer = document.createElement('div');
  difficultyContainer.id = ContainerIds.DIFFICULTY;

  Object.keys(settingsMap).forEach(difficulty => {
    const btnDifficulty = document.createElement('button');
    btnDifficulty.type = 'button';
    btnDifficulty.classList.add('difficulty');
    btnDifficulty.textContent = difficulty;

    btnDifficulty.addEventListener('click', () => {
      setSettings(difficulty as DifficultySettings)
    });

    difficultyContainer.appendChild(btnDifficulty);
  })

  const btnSettings = document.createElement('button');
  btnSettings.type = 'button';
  btnSettings.textContent = '⚙';

  root?.appendChild(title);
  root?.appendChild(container);
  container.appendChild(btnStartGame);
  root?.appendChild(difficultyContainer);
  root?.appendChild(btnSettings);
}
