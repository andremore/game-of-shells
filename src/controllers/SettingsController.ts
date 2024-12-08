import { settingsStore } from "../stores/settingsStore";
import { SettingsStore } from "../types/types";
import { handleCancel, handleSubmit } from "../utils/settingsFormHandlers";
import { DifficultyContainer } from "../components/DifficultyContainer";
import { SettingsModal } from "../components/SettingsModal";

export function SettingsController() {
    const currentSettingsStoreVals = JSON.parse(JSON.stringify(settingsStore));

    const {
        modalDialog,
        applyButton,
        inputContainer,
        cancelButton
    } = SettingsModal();

    function updateModalInputs() {
        const inputs = inputContainer.querySelectorAll('input[type="number"]') as unknown as HTMLInputElement[];
        inputs.forEach(input => {
            const key = input.name as keyof SettingsStore;
            if (settingsStore[key]) {
                input.value = settingsStore[key].toString();
            }
        });
    }

    DifficultyContainer(updateModalInputs, settingsStore.difficulty);

    modalDialog.showModal();

    const submitHandler = handleSubmit(inputContainer, applyButton, modalDialog);
    applyButton.addEventListener('click', submitHandler);
    cancelButton.addEventListener('click', () => handleCancel(currentSettingsStoreVals, modalDialog));

    return modalDialog;
}
