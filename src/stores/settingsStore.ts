import { normalSettings, settingsMap } from "../utils/constants";
import { Difficulty } from "../types/enums";
import { SettingsStore } from "../types/types";
import { setChancesLeft } from "./gameStore";

export let settingsStore: SettingsStore = normalSettings;

// Settings setter based on presets
export function setSettingsBasedOnPresets(difficulty: Exclude<Difficulty, Difficulty.CUSTOM>) {
    settingsStore = settingsMap[difficulty];
    setChancesLeft(settingsMap[difficulty].chances);
}

// Settings generic setter
export function setSettings(newSettings: SettingsStore) {
   settingsStore = newSettings;
   setChancesLeft(newSettings.chances);
}
