import { settingsStore } from "../stores/settingsStore";
import { SettingsKeys } from "../types/enums";
import { SettingsStore } from "../types/types";
import { settingsInputsMap } from "../utils/constants";

export function ModalInputNumber(settingsKey: SettingsKeys) {
    const { label, key } = settingsInputsMap[settingsKey];
    const labelEl = document.createElement('label');
    labelEl.textContent = label;

    const inputEl = document.createElement('input');
    inputEl.type = 'number';
    inputEl.value = settingsStore[key as keyof SettingsStore].toString();
    inputEl.min = '0';
    inputEl.step = '1';
    inputEl.name = key;

    labelEl.appendChild(inputEl);

    return labelEl;
}
