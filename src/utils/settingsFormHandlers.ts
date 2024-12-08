import { setSettings } from "../stores/settingsStore";
import { Mode } from "../types/enums";
import { SettingsStore } from "../types/types";

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

        // TODO: Remove when implemented
        formValues.mode = Mode.DEFAULT;

        // FIXME: Avoid using as unknown if possible
        setSettings(formValues as unknown as SettingsStore);
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
