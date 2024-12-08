import { normalSettings, settingsMap } from "../utils/constants";
import { Difficulty } from "../types/enums";
import { SettingsStore } from "../types/types";
import { setChancesLeft } from "./gameStore";

export let settingsStore: SettingsStore = normalSettings;

export function setSettingsBasedOnPresets(difficulty: Exclude<Difficulty, Difficulty.CUSTOM>) {
    settingsStore = settingsMap[difficulty];
    setChancesLeft(settingsMap[difficulty].chances);
}

export function setSettings(newSettings: SettingsStore) {
   settingsStore = newSettings;
   setChancesLeft(newSettings.chances);
}
