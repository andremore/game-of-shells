import { Difficulty } from "../types/enums";

export function BtnDifficulty(difficulty: Difficulty) {
    const btnDifficulty = document.createElement('button');
    btnDifficulty.type = 'button';
    btnDifficulty.classList.add('difficulty');
    btnDifficulty.textContent = difficulty;

    return btnDifficulty;
}
