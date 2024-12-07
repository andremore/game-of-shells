import { Mode, Speed } from "./types/enums";
import { Settings } from "./types/types";

export const easyDifficulty: Settings = {
    shellNumber: 3,
    shuffleNumber: 2,
    speed: Speed.SLOW,
    chances: 2,
    mode: Mode.DEFAULT,
    displayBallTTl: 1500
}

export const normalDifficulty: Settings = {
    shellNumber: 3,
    shuffleNumber: 3,
    speed: Speed.NORMAL,
    chances: 1,
    mode: Mode.DEFAULT,
    displayBallTTl: 1000
}

export const hardDifficulty: Settings = {
    shellNumber: 4,
    shuffleNumber: 3,
    speed: Speed.FAST,
    chances: 1,
    mode: Mode.DEFAULT,
    displayBallTTl: 750
}

export const hardcoreDifficulty: Settings = {
    shellNumber: 6,
    shuffleNumber: 5,
    speed: Speed.HARDCORE,
    chances: 1,
    mode: Mode.DEFAULT,
    displayBallTTl: 350
}

export const root = document.querySelector<HTMLDivElement>('#app');

export const gameIrrelevantElementIds = ['start-game', 'settings'];
export const gameIrrelevantClassNames = ['.post-game'];
