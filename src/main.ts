import { BtnSettings } from './components/BtnSettings';
import { GameContainer } from './components/GameContainer';
import { DifficultyContainer } from './components/DifficultyContainer';
import { Title } from './components/Title';
import { root } from './utils/constants';
import './style.css';

function main() {
  root?.appendChild(Title());
  root?.appendChild(GameContainer());
  DifficultyContainer();
  root?.appendChild(BtnSettings())
};

main();
