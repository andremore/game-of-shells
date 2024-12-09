import { BtnSettings } from './components/Button/BtnSettings';
import { GameContainer } from './components/GameContainer';
import { root } from './utils/constants';
import './style.css';
import { SettingsController } from './controllers/SettingsController';
import { BtnRestart } from './components/Button/BtnRestart';
import { gameStore } from './stores/gameStore';
import { restartGame } from './game/gameLogic';

function main() {
  const header = document.createElement('header');

  const btnSettings = BtnSettings();
  btnSettings.addEventListener('click', () => {
    SettingsController();
  });

  const btnRestart = BtnRestart();
  btnRestart.disabled = true;
  btnRestart.addEventListener('click', () => {
    if (gameStore.isGameOngoing) {
      return;
    }

    restartGame(true);

    document.getElementById('post-game-msg')?.remove();
    document.getElementById('post-game-btn')?.remove();
    btnRestart.disabled = true;
  });

  const btnContainer = document.createElement('div');
  btnContainer.id = 'btn-container';
  btnContainer.appendChild(btnSettings);
  btnContainer.appendChild(btnRestart);

  const title = document.createElement('h1');
  title.textContent = 'Game of Santas';
  title.id = 'title';
  
  header?.appendChild(title);
  header?.appendChild(btnContainer);
  root?.appendChild(header);

  const main = document.createElement('main');
  main?.appendChild(GameContainer());

  root?.appendChild(main);
}

main();
