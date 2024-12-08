import { normalSettings, settingsMap } from "../utils/constants";
import { Difficulty } from "../types/enums";
import { SettingsStore } from "../types/types";
import { setChances } from "./gameStore";

export let settingsStore: SettingsStore = normalSettings;

export function setSettingsBasedOnPresets(difficulty: Difficulty) {
    settingsStore = settingsMap[difficulty];
    setChances(settingsMap[difficulty].chances);
}

export function setSettings(newSettings: SettingsStore) {
   settingsStore = newSettings;
   setChances(newSettings.chances);
}