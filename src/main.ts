import { BtnSettings } from './components/BtnSettings';
import { GameContainer } from './components/GameContainer';
import { Title } from './components/Title';
import { root } from './utils/constants';
import './style.css';
import { SettingsController } from './controllers/SettingsController';

function main() {
  root?.appendChild(Title());
  root?.appendChild(GameContainer());

  const btnSettings = BtnSettings();
  btnSettings.addEventListener('click', () => {
    SettingsController();
  })

  root?.appendChild(btnSettings);
}

main();
