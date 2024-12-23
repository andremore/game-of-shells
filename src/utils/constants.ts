import { Classes, Difficulty, Ids, SettingsStoreKeys, Speed } from "../types/enums";
import { SettingsStore } from "../types/types";

export const easySettings: SettingsStore = {
    shellNumber: 3,
    shuffleNumber: 2,
    speed: Speed.SLOW,
    chances: 2,
    displayBallTTl: 1500,
    difficulty: Difficulty.EASY
}

export const normalSettings: SettingsStore = {
    shellNumber: 3,
    shuffleNumber: 5,
    speed: Speed.NORMAL,
    chances: 1,
    displayBallTTl: 1000,
    difficulty: Difficulty.NORMAL
}

export const hardSettings: SettingsStore = {
    shellNumber: 5,
    shuffleNumber: 10,
    speed: Speed.FAST,
    chances: 1,
    displayBallTTl: 750,
    difficulty: Difficulty.HARD
}

export const settingsMap = {
    [Difficulty.EASY]: easySettings,
    [Difficulty.NORMAL]: normalSettings,
    [Difficulty.HARD]: hardSettings,
    [Difficulty.CUSTOM]: normalSettings,
}

export const settingsInputsMap = {
    [SettingsStoreKeys.CHANCES]: {
        label: 'Chances:',
        key: 'chances'
    },
    [SettingsStoreKeys.SHELL_NUMBER]: {
        label: 'Santas:',
        key: 'shellNumber'
    },
    [SettingsStoreKeys.SHUFFLE_NUMBER]: {
        label: 'Shell Shuffles:',
        key: 'shuffleNumber'
    },
    [SettingsStoreKeys.SPEED]: {
        label: 'Shuffle Delay:',
        key: 'speed'
    },
    [SettingsStoreKeys.DISPLAY_BALL_TTL]: {
        label: 'Display ball time:',
        key: 'displayBallTTl'
    }
}

export const maxValues: Partial<Record<keyof SettingsStore, string>> = {
    [SettingsStoreKeys.CHANCES]: '5',
    [SettingsStoreKeys.SHELL_NUMBER]: '6',
    [SettingsStoreKeys.SHUFFLE_NUMBER]: '20',
    [SettingsStoreKeys.SPEED]: '150',
    [SettingsStoreKeys.DISPLAY_BALL_TTL]: '5000'
};

export const root = document.querySelector<HTMLDivElement>('#app');

export const gameIrrelevantElementIds = [Ids.BTN_START_GAME, Ids.POST_GAME_BTN, Ids.POST_GAME_MSG, Ids.POST_GAME_IMG];
export const gameIrrelevantClassNames = [Classes.POST_GAME];
