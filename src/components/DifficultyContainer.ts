import { root, settingsMap } from "../utils/constants";
import { ContainerIds, Difficulty } from "../types/enums";
import { BtnDifficulty } from "./BtnDifficulty";

export function DifficultyContainer(appendToRoot = true) {
  const difficultyContainer = document.createElement('div');
  difficultyContainer.id = ContainerIds.DIFFICULTY;

  Object.keys(settingsMap).forEach(difficulty => {
    difficultyContainer.appendChild(BtnDifficulty(difficulty as Difficulty));
  })

  if (appendToRoot) {
    root?.appendChild(difficultyContainer);
    return;
  }

  difficultyContainer.classList.add(`modal-${ContainerIds.DIFFICULTY}`);
  const difficultyPresetsContainer = document.getElementById('difficulty-presets-container');
  difficultyPresetsContainer?.appendChild(difficultyContainer);
}
