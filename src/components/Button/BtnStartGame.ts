import { startGame } from "../../game/startGame";
import { ButtonType, Ids } from "../../types/enums";
import { Button } from "./Button";

export function BtnStartGame() {
  return Button({
    id: Ids.BTN_START_GAME,
    textContent: 'Start Game',
    type: ButtonType.BUTTON,
    onClick: startGame
  });
};
