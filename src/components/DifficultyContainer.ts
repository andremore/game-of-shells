import { setSettingsBasedOnPresets } from "../stores/settingsStore";
import { Ids, Difficulty } from "../types/enums";
import { settingsMap } from "../utils/constants";
import { BtnDifficulty } from "./Button/BtnDifficulty";

export function DifficultyContainer(updateModalInputs: () => void, currentDifficulty: Difficulty) {
  const difficultyContainer = document.createElement('div');
  difficultyContainer.id = Ids.DIFFICULTY;
  difficultyContainer.classList.add(`modal-${Ids.DIFFICULTY}`);

  Object.keys(settingsMap).forEach(difficulty => {
    const classNames = ['difficulty'];

    // FIXME: Duplicated code
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
        // FIXME: Duplicated code
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
