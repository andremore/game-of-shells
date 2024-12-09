import { setSettings, settingsStore } from "../stores/settingsStore";
import { Difficulty } from "../types/enums";
import { SettingsStore } from "../types/types";
import { settingsMap } from "./constants";

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

        if (Object.keys(formValues).length < Object.keys(settingsStore).length) {
            settingsToSubmit = settingsMap[formValues.difficulty as Difficulty];
        }

        setSettings(settingsToSubmit as SettingsStore);
        closeModal(modalDialog, applyButton);
    };
}

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
