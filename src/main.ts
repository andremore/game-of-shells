import { BtnSettings } from './components/BtnSettings';
import { GameContainer } from './components/GameContainer';
import { Title } from './components/Title';
import { root } from './utils/constants';
import './style.css';
import { SettingsModal } from './components/SettingsModal';

function main() {
  root?.appendChild(Title());
  root?.appendChild(GameContainer());

  const btnSettings = BtnSettings();
  btnSettings.addEventListener('click', () => {
    SettingsModal();
  })

  root?.appendChild(btnSettings);
}

main();
