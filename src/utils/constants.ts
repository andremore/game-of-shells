import { ContainerIds, Difficulty, Mode, SettingsKeys, Speed } from "../types/enums";
import { SettingsStore } from "../types/types";

export const easySettings: SettingsStore = {
    shellNumber: 3,
    shuffleNumber: 2,
    speed: Speed.SLOW,
    chances: 2,
    mode: Mode.DEFAULT,
    displayBallTTl: 1500
}

export const normalSettings: SettingsStore = {
    shellNumber: 3,
    shuffleNumber: 3,
    speed: Speed.NORMAL,
    chances: 1,
    mode: Mode.DEFAULT,
    displayBallTTl: 1000
}

export const hardSettings: SettingsStore = {
    shellNumber: 4,
    shuffleNumber: 3,
    speed: Speed.FAST,
    chances: 1,
    mode: Mode.DEFAULT,
    displayBallTTl: 750
}

export const hardcoreSettings: SettingsStore = {
    shellNumber: 6,
    shuffleNumber: 5,
    speed: Speed.HARDCORE,
    chances: 1,
    mode: Mode.DEFAULT,
    displayBallTTl: 250
}

export const settingsMap = {
    [Difficulty.EASY]: easySettings,
    [Difficulty.NORMAL]: normalSettings,
    [Difficulty.HARD]: hardSettings,
    [Difficulty.HARDCORE]: hardcoreSettings
}

export const settingsInputsMap = {
    [SettingsKeys.CHANCES]: {
        label: 'Chances:',
        key: 'chances'
    },
    [SettingsKeys.SHELL_NUMBER]: {
        label: 'Shells:',
        key: 'shellNumber'
    },
    [SettingsKeys.SHUFFLE_NUMBER]: {
        label: 'Shell Shuffles:',
        key: 'shuffleNumber'
    },
    [SettingsKeys.SPEED]: {
        label: 'Shuffle Speed:',
        key: 'speed'
    },
    [SettingsKeys.DISPLAY_BALL_TTL]: {
        label:'Display ball time:',
        key: 'displayBallTTl'
    }
}

export const root = document.querySelector<HTMLDivElement>('#app');

// FIXME:
export const gameIrrelevantElementIds = ['start-game', ContainerIds.DIFFICULTY];
export const gameIrrelevantClassNames = ['.post-game'];
