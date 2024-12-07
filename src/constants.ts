import { Mode, Speed } from "./types/enums";
import { Settings } from "./types/types";

export const defaultSettings: Settings = {
    shellNumber: 3,
    shuffleNumber: 3,
    speed: Speed.NORMAL,
    chances: 1,
    mode: Mode.DEFAULT
};

export const root = document.querySelector<HTMLDivElement>('#app');

export const gameIrrelevantElementIds = ['start-game', 'settings'];
export const gameIrrelevantClassNames = ['.post-game'];
