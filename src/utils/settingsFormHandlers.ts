import { setSettings, settingsStore } from "../stores/settingsStore";
import { Difficulty } from "../types/enums";
import { SettingsStore } from "../types/types";
import { settingsMap } from "./constants";

// Helper function to determine if a preset is selected
function isPresetSelected(formValues: Record<string, string>, settingsStore: SettingsStore): boolean {
    return Object.keys(formValues).length < Object.keys(settingsStore).length;
}

export function handleSubmit(
    inputContainer: HTMLFormElement,
    applyButton: HTMLButtonElement,
    modalDialog: HTMLDialogElement
) {
    return (e: Event) => {
        e.preventDefault();

        const formData = new FormData(inputContainer);
        const formValues: Record<string, string> = {};

        formData.forEach((value, key) => {
            formValues[key] = value as string;
        });

        const selectedDifficultyEl = document.querySelector('.selected-difficulty');

        if (selectedDifficultyEl == null) {
            formValues.difficulty = Difficulty.CUSTOM;
        } else {
            formValues.difficulty = selectedDifficultyEl.textContent as string;
        }

        let settingsToSubmit: Record<string, string> | SettingsStore = formValues;

        if (isPresetSelected(formValues, settingsStore)) {
            // In case the user chose a preset we get that preset from the map
            settingsToSubmit = settingsMap[formValues.difficulty as Difficulty];
        }

        setSettings(settingsToSubmit as SettingsStore);
        closeModal(modalDialog, applyButton);
    };
}

// Restores previous settings
export function handleCancel(
    currentSettingsStoreVals: SettingsStore,
    modalDialog: HTMLDialogElement
) {
    setSettings(currentSettingsStoreVals);
    closeModal(modalDialog);
}

function closeModal(
    modalDialog: HTMLDialogElement,
    applyButton?: HTMLButtonElement
) {
    modalDialog.close();

    if (applyButton) {
        applyButton.removeEventListener('click', () => handleSubmit);
    };

    document.body.removeChild(modalDialog);
    document.body.removeChild(document.getElementById('modal-overlay')!);
}
