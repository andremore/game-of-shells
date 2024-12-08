import { BtnSettings } from './components/BtnSettings';
import { GameContainer } from './components/GameContainer';
import { Title } from './components/Title';
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
  main?.appendChild(Title());
  main?.appendChild(GameContainer());
  root?.appendChild(main);
}

main();
