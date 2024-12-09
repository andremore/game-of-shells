import { guessHandler } from "../game/gameLogic";
import { gameStore } from "../stores/gameStore";
import { settingsStore } from "../stores/settingsStore";
import { Ids } from "../types/enums";

export function Shells(chancesSpan: HTMLSpanElement | null) {
    const gameContainer = document.getElementById(Ids.GAME);
    let shellContainer = document.getElementById(Ids.SHELL);

    if (!shellContainer) {
        shellContainer = document.createElement('div');
    }

    shellContainer.id = Ids.SHELL;

    for (let i = 0; i < settingsStore.shellNumber; i++) {
        const shell = document.createElement('div');
        shell.classList.add('shell');

        const hat = document.createElement('img');
        hat.src = '/hat.svg';
        hat.classList.add('hat');
        shell.appendChild(hat);

        shellContainer.appendChild(shell);
        gameStore.shells.push({
            element: shell,
            listener: () => guessHandler(i, chancesSpan),
            handlerFn: () => null
        });
    }

    gameContainer?.appendChild(shellContainer);
};
