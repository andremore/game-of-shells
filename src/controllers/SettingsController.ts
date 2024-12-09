import { settingsStore } from "../stores/settingsStore";
import { SettingsStore } from "../types/types";
import { handleCancel, handleSubmit } from "../utils/settingsFormHandlers";
import { DifficultyContainer } from "../components/DifficultyContainer";
import { SettingsModal } from "../components/SettingsModal";

import '../styles/modal.css';

export function SettingsController() {
    const currentSettingsStoreVals = JSON.parse(JSON.stringify(settingsStore));

    const {
        modalDialog,
        applyButton,
        form,
        cancelButton
    } = SettingsModal();

    function updateModalInputs() {
        const inputs = form.querySelectorAll('input[type="number"]') as unknown as HTMLInputElement[];
        inputs.forEach(input => {
            const key = input.name as keyof SettingsStore;
            if (settingsStore[key]) {
                input.value = settingsStore[key].toString();
            }
        });
    }

    DifficultyContainer(
        updateModalInputs,
        settingsStore.difficulty,
        form
    );

    modalDialog.showModal();

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
