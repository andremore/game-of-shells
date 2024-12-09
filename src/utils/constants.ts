import { Ids, Difficulty, Mode, SettingsStoreKeys, Speed, Classes } from "../types/enums";
import { SettingsStore } from "../types/types";

export const easySettings: SettingsStore = {
    shellNumber: 3,
    shuffleNumber: 2,
    speed: Speed.SLOW,
    chances: 2,
    mode: Mode.DEFAULT,
    displayBallTTl: 1500,
    difficulty: Difficulty.EASY
}

export const normalSettings: SettingsStore = {
    shellNumber: 3,
    shuffleNumber: 3,
    speed: Speed.NORMAL,
    chances: 1,
    mode: Mode.DEFAULT,
    displayBallTTl: 1000,
    difficulty: Difficulty.NORMAL
}

export const hardSettings: SettingsStore = {
    shellNumber: 4,
    shuffleNumber: 3,
    speed: Speed.FAST,
    chances: 1,
    mode: Mode.DEFAULT,
    displayBallTTl: 750,
    difficulty: Difficulty.HARD
}

export const hardcoreSettings: SettingsStore = {
    shellNumber: 6,
    shuffleNumber: 5,
    speed: Speed.HARDCORE,
    chances: 1,
    mode: Mode.DEFAULT,
    displayBallTTl: 250,
    difficulty: Difficulty.HARDCORE
}

export const settingsMap = {
    [Difficulty.EASY]: easySettings,
    [Difficulty.NORMAL]: normalSettings,
    [Difficulty.HARD]: hardSettings,
    [Difficulty.HARDCORE]: hardcoreSettings
}

export const settingsInputsMap = {
    [SettingsStoreKeys.CHANCES]: {
        label: 'Chances:',
        key: 'chances'
    },
    [SettingsStoreKeys.SHELL_NUMBER]: {
        label: 'Shells:',
        key: 'shellNumber'
    },
    [SettingsStoreKeys.SHUFFLE_NUMBER]: {
        label: 'Shell Shuffles:',
        key: 'shuffleNumber'
    },
    [SettingsStoreKeys.SPEED]: {
        label: 'Shuffle Speed:',
        key: 'speed'
    },
    [SettingsStoreKeys.DISPLAY_BALL_TTL]: {
        label:'Display ball time:',
        key: 'displayBallTTl'
    }
}

export const root = document.querySelector<HTMLDivElement>('#app');

export const gameIrrelevantElementIds = [Ids.BTN_START_GAME, Ids.START_GAME_SANTA, Ids.POST_GAME_BTN, Ids.POST_GAME_MSG, Ids.POST_GAME_IMG];
export const gameIrrelevantClassNames = [Classes.POST_GAME];
