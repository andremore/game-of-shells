import { startGame } from "../../game/startGame";
import { ButtonType, ContainerIds } from "../../types/enums";
import { Button } from "./Button";

export function BtnStartGame() {
  return Button({
    // FIXME: Fix this id
    id: ContainerIds.START_GAME,
    textContent: 'Start Game',
    type: ButtonType.BUTTON,
    onClick: startGame
  });
};
