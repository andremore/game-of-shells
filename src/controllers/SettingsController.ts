import { DifficultyContainer } from "../components/DifficultyContainer";
import { SettingsModal } from "../components/SettingsModal";
import { settingsStore } from "../stores/settingsStore";
import { SettingsStore } from "../types/types";
import { handleCancel, handleSubmit } from "../utils/settingsFormHandlers";
import { maxValues } from "../utils/constants";

import '../styles/modal.css';

export function SettingsController() {
    // Current settings store state copy
    const currentSettingsStoreVals = JSON.parse(JSON.stringify(settingsStore));

    const {
        modalDialog,
        applyButton,
        form,
        cancelButton
    } = SettingsModal();

    // Updates input values based on difficulty
    function updateModalInputs() {
        const inputs = form.querySelectorAll('input[type="number"]') as unknown as HTMLInputElement[];
        inputs.forEach(input => {
            const key = input.name as keyof SettingsStore;

            if (settingsStore[key]) {
                input.value = settingsStore[key].toString();
            }

            const maxValue = parseInt(maxValues[key] as string, 10);
            input.max = maxValue.toString();

            input.addEventListener('input', () => {
                if (parseInt(input.value, 10) > maxValue) {
                    input.value = maxValue.toString();
                }
            });
        });
    }

    DifficultyContainer(
        updateModalInputs,
        settingsStore.difficulty,
        form
    );

    modalDialog.showModal();

    // We had to add this to make sure the cancel handler runs when the escape key is pressed
    const escapeKeyListener = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && modalDialog.open) {
            handleCancel(currentSettingsStoreVals, modalDialog);
            document.removeEventListener('keydown', escapeKeyListener);
        }
    };

    document.addEventListener('keydown', escapeKeyListener);

    const submitHandler = handleSubmit(form, applyButton, modalDialog);
    applyButton.addEventListener('click', submitHandler);
    cancelButton.addEventListener('click', () => handleCancel(currentSettingsStoreVals, modalDialog));

    return modalDialog;
}
