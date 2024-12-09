import { BtnSettings } from './components/Button/BtnSettings';
import { GameContainer } from './components/GameContainer';
import { root } from './utils/constants';
import { SettingsController } from './controllers/SettingsController';
import { BtnRestart } from './components/Button/BtnRestart';
import { gameStore } from './stores/gameStore';
import { restartGame } from './game/gameLogic';
import { Ids } from './types/enums';

import './main.css';
import './styles/header.css';

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

    document.getElementById(Ids.POST_GAME_MSG)?.remove();
    document.getElementById(Ids.POST_GAME_BTN)?.remove();
    document.getElementById(Ids.POST_GAME_IMG)?.remove();
    btnRestart.disabled = true;
  });

  const btnContainer = document.createElement('div');
  btnContainer.id = 'btn-container';
  btnContainer.appendChild(btnSettings);
  btnContainer.appendChild(btnRestart);

  const logo = document.createElement('img');
  logo.src = '/hat.svg';

  const title = document.createElement('h1');
  title.textContent = 'Game of Santas';

  const logoTitleContainer = document.createElement('div');
  logoTitleContainer.id = 'logo-title-container';
  logoTitleContainer.appendChild(logo);
  logoTitleContainer.appendChild(title);

  header?.appendChild(logoTitleContainer);
  header?.appendChild(btnContainer);
  root?.appendChild(header);

  const main = document.createElement('main');
  main?.appendChild(GameContainer());

  root?.appendChild(main);
}

main();
