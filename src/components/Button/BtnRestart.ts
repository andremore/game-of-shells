import { ButtonType } from "../../types/enums";
import { Button } from "./Button";

export function BtnRestart() {
  return Button({
    id: 'btn-restart',
    textContent: '↺',
    type: ButtonType.BUTTON,
  });
};
