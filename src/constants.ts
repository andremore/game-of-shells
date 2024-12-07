import { ContainerIds, DifficultySettings, Mode, Speed } from "./types/enums";
import { Settings } from "./types/types";

export const easySettings: Settings = {
    shellNumber: 3,
    shuffleNumber: 2,
    speed: Speed.SLOW,
    chances: 2,
    mode: Mode.DEFAULT,
    displayBallTTl: 1500
}

export const normalSettings: Settings = {
    shellNumber: 3,
    shuffleNumber: 3,
    speed: Speed.NORMAL,
    chances: 1,
    mode: Mode.DEFAULT,
    displayBallTTl: 1000
}

export const hardSettings: Settings = {
    shellNumber: 4,
    shuffleNumber: 3,
    speed: Speed.FAST,
    chances: 1,
    mode: Mode.DEFAULT,
    displayBallTTl: 750
}

export const hardcoreSettings: Settings = {
    shellNumber: 6,
    shuffleNumber: 5,
    speed: Speed.HARDCORE,
    chances: 1,
    mode: Mode.DEFAULT,
    displayBallTTl: 250
}

export const settingsMap = {
    [DifficultySettings.EASY]: easySettings,
    [DifficultySettings.NORMAL]: normalSettings,
    [DifficultySettings.HARD]: hardSettings,
    [DifficultySettings.HARDCORE]: hardcoreSettings
}

export const root = document.querySelector<HTMLDivElement>('#app');

export const gameIrrelevantElementIds = ['start-game', 'settings', ContainerIds.DIFFICULTY];
export const gameIrrelevantClassNames = ['.post-game'];
