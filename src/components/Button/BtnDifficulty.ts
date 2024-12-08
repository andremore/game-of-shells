import { Difficulty } from "../../types/enums";

import { ButtonType } from "../../types/enums";
import { Button } from "./Button";

type BtnDifficulty = {
  difficulty: Difficulty
  classNames: string[]
  onClick: () => void
}

export function BtnDifficulty({
  difficulty,
  classNames,
  onClick
}: BtnDifficulty) {
  return Button({
    textContent: difficulty,
    type: ButtonType.BUTTON,
    onClick,
    classNames,
  });
};
