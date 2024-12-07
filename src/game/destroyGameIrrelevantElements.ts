import { gameIrrelevantClassNames, gameIrrelevantElementIds } from "../utils/constants";

export function destroyGameIrrelevantElements(): void {
    let i = 0;
    for (; i < gameIrrelevantElementIds.length; i++) {
        document.getElementById(gameIrrelevantElementIds[i])?.remove();
    }

    let j = 0;
    for (; j < gameIrrelevantClassNames.length; j++) {
        document.querySelectorAll(gameIrrelevantClassNames[j]).forEach(el => el.remove());
    }
}
