import { setSettingsBasedOnPresets } from "../stores/settingsStore";
import { ContainerIds, Difficulty } from "../types/enums";
import { settingsMap } from "../utils/constants";
import { BtnDifficulty } from "./BtnDifficulty";

export function DifficultyContainer(updateModalInputs: () => void) {
  const difficultyContainer = document.createElement('div');
  difficultyContainer.id = ContainerIds.DIFFICULTY;
  difficultyContainer.classList.add(`modal-${ContainerIds.DIFFICULTY}`);

  Object.keys(settingsMap).forEach(difficulty => {
    const btnDifficulty = BtnDifficulty(difficulty as Difficulty);

      btnDifficulty.addEventListener('click', () => {
        setSettingsBasedOnPresets(difficulty as Difficulty);
        updateModalInputs();
      })

    difficultyContainer.appendChild(btnDifficulty);
  });

  const difficultyPresetsContainer = document.getElementById('difficulty-presets-container');
  difficultyPresetsContainer?.appendChild(difficultyContainer);
}
