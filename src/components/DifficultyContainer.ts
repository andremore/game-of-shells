import { root, settingsMap } from "../utils/constants";
import { ContainerIds, Difficulty } from "../types/enums";
import { BtnDifficulty } from "./BtnDifficulty";

export function DifficultyContainer() {
  const difficultyContainer = document.createElement('div');
  difficultyContainer.id = ContainerIds.DIFFICULTY;

  Object.keys(settingsMap).forEach(difficulty => {
    difficultyContainer.appendChild(BtnDifficulty(difficulty as Difficulty));
  })

  root?.appendChild(difficultyContainer);
}
