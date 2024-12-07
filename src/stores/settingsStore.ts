import { normalSettings, settingsMap } from "../constants";
import { Difficulty } from "../types/enums";
import { SettingsStore } from "../types/types";
import { setChances } from "./gameStore";

export let settingsStore: SettingsStore = normalSettings;

export function setSettings(difficulty: Difficulty) {
    settingsStore = settingsMap[difficulty];
    setChances(settingsMap[difficulty].chances);
}
