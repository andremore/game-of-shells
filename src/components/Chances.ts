import { gameState } from "../state";
import { ContainerIds } from "../types/enums";

export function Chances() {
    const chancesContainer = document.createElement('div');
    chancesContainer.id = ContainerIds.CHANCES;

    const chancesSpan = document.createElement('span');
    chancesSpan.textContent = `${gameState.chances} chances left`;
    chancesContainer.appendChild(chancesSpan);

    const title = document.getElementById('title');
    title?.insertAdjacentElement('afterend', chancesContainer);

    return chancesSpan;
}
