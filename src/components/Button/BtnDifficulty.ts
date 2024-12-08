import { Difficulty } from "../../types/enums";

import { ButtonType } from "../../types/enums";
import { Button } from "./Button";

export function BtnDifficulty(difficulty: Difficulty) {
  return Button({
    textContent: difficulty,
    type: ButtonType.BUTTON,
    classNames: ['difficulty']
  });
};
