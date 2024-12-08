import { BtnSettings } from './components/Button/BtnSettings';
import { GameContainer } from './components/GameContainer';
import { root } from './utils/constants';
import './style.css';
import { SettingsController } from './controllers/SettingsController';

function main() {
  const header = document.createElement('header');

  const btnSettings = BtnSettings();
  btnSettings.addEventListener('click', () => {
    SettingsController();
  });

  header?.appendChild(btnSettings);
  root?.appendChild(header);

  const main = document.createElement('main');

  const title = document.createElement('h1');
  title.textContent = 'Game of Santas';
  title.id = 'title';

  main?.appendChild(title);
  main?.appendChild(GameContainer());
  root?.appendChild(main);
}

main();
