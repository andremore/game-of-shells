import { ButtonType } from "../../types/enums";
import { Button } from "./Button";

export function BtnSettings() {
  return Button({
    id: 'btn-settings',
    textContent: '⚙',
    type: ButtonType.BUTTON,
  });
};
