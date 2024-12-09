import { gameStore } from "../stores/gameStore";
import { Ids } from "../types/enums";

// Displays chances left if any
export function Chances(): HTMLSpanElement {
    const chancesContainer = document.createElement('div');
    chancesContainer.id = Ids.CHANCES;

    const chancesSpan = document.createElement('span');
    chancesSpan.id = 'chances';
    chancesSpan.textContent = `${gameStore.chancesLeft} chances left`;
    chancesContainer.appendChild(chancesSpan);

    const gameContainer = document.getElementById(Ids.GAME);
    gameContainer?.appendChild(chancesContainer);

    return chancesSpan;
}
