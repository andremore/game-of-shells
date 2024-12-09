import { setSettingsBasedOnPresets } from "../stores/settingsStore";
import { Ids, Difficulty } from "../types/enums";
import { settingsMap } from "../utils/constants";
import { BtnDifficulty } from "./Button/BtnDifficulty";

function updateSelectedDifficultyAndInputs(
  newDifficultyElement: HTMLElement | null,
  form: HTMLFormElement,
  difficulty: Difficulty
): void {
  const previousSelectedDifficultyEl = document.querySelector('.selected-difficulty');

  if (previousSelectedDifficultyEl != null) {
    previousSelectedDifficultyEl.classList.remove('selected-difficulty');
  }

  if (newDifficultyElement != null) {
    newDifficultyElement.classList.add('selected-difficulty');
  }

  const inputs = form.querySelectorAll('input') as unknown as HTMLInputElement[];

  inputs.forEach((input: HTMLInputElement) => {
    input.disabled = difficulty !== Difficulty.CUSTOM;
  });
}

export function DifficultyContainer(
  updateModalInputs: () => void,
  currentDifficulty: Difficulty,
  form: HTMLFormElement
) {
  const difficultyContainer = document.createElement('div');
  difficultyContainer.id = Ids.DIFFICULTY;
  difficultyContainer.classList.add(`modal-${Ids.DIFFICULTY}`);

  Object.keys(settingsMap).forEach(difficulty => {
    const classNames = ['difficulty'];

    if (currentDifficulty === difficulty) {
      updateSelectedDifficultyAndInputs(null, form, difficulty);
      classNames.push('selected-difficulty');
    }

    const btnDifficulty = BtnDifficulty({
      difficulty: difficulty as Difficulty,
      classNames,
      onClick: () => updateSelectedDifficultyAndInputs(btnDifficulty, form, difficulty as Difficulty)
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
