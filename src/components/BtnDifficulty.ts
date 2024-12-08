import { setSettingsBasedOnPresets } from "../stores/settingsStore";
import { Difficulty } from "../types/enums";

export function BtnDifficulty(difficulty: Difficulty) {
    const btnDifficulty = document.createElement('button');
    btnDifficulty.type = 'button';
    btnDifficulty.classList.add('difficulty');
    btnDifficulty.textContent = difficulty;

    btnDifficulty.addEventListener('click', () => {
        setSettingsBasedOnPresets(difficulty as Difficulty)
    });

    return btnDifficulty;
}