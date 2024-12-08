import { setSettingsBasedOnPresets } from "../stores/settingsStore";
import { ContainerIds, Difficulty } from "../types/enums";
import { settingsMap } from "../utils/constants";
import { BtnDifficulty } from "./Button/BtnDifficulty";

export function DifficultyContainer(updateModalInputs: () => void, currentDifficulty: Difficulty) {
  const difficultyContainer = document.createElement('div');
  difficultyContainer.id = ContainerIds.DIFFICULTY;
  difficultyContainer.classList.add(`modal-${ContainerIds.DIFFICULTY}`);

  Object.keys(settingsMap).forEach(difficulty => {
    const classNames = ['difficulty'];

    if (currentDifficulty === difficulty) {
      const previousSelectedDifficultyEl = document.querySelector('.selected-difficulty');

      if (previousSelectedDifficultyEl != null) {
        previousSelectedDifficultyEl.classList.remove('selected-difficulty');
      }

      classNames.push('selected-difficulty');
    }

    const btnDifficulty = BtnDifficulty({
      difficulty: difficulty as Difficulty,
      classNames,
      onClick: () => {
        const previousSelectedDifficultyEl = document.querySelector('.selected-difficulty');

        if (previousSelectedDifficultyEl != null) {
          previousSelectedDifficultyEl.classList.remove('selected-difficulty');
        }

        btnDifficulty.classList.add('selected-difficulty');
      }
    });

    btnDifficulty.addEventListener('click', () => {
      setSettingsBasedOnPresets(difficulty as Exclude<Difficulty, Difficulty.CUSTOM>);
      updateModalInputs();
    })

    difficultyContainer.appendChild(btnDifficulty);
  });

  const difficultyPresetsContainer = document.getElementById('difficulty-presets-container');
  difficultyPresetsContainer?.appendChild(difficultyContainer);
}
