import { setSettings, settingsStore } from "../stores/settingsStore";
import { Mode, SettingsKeys } from "../types/enums";
import { SettingsStore } from "../types/types";
import { DifficultyContainer } from "./DifficultyContainer";
import { ModalInputNumber } from "./ModalInputNumber";

export function SettingsModal() {
    const currentSettingsStoreVals = JSON.parse(JSON.stringify(settingsStore));

    const overlay = document.createElement('div');
    overlay.id = 'modal-overlay';
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    const modalDialog = document.createElement('dialog');
    modalDialog.id = 'settings-modal';
    modalDialog.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const modalTitle = document.createElement('h2');
    modalTitle.textContent = 'Game Settings';
    modalContent.appendChild(modalTitle);

    const difficultyPresetsContainer = document.createElement('div');
    difficultyPresetsContainer.id = 'difficulty-presets-container';

    const difficultyPresetsTitle = document.createElement('label');
    difficultyPresetsTitle.textContent = 'Presets:';

    difficultyPresetsContainer.appendChild(difficultyPresetsTitle);
    modalContent.appendChild(difficultyPresetsContainer);

    const inputContainer = document.createElement('form');
    inputContainer.id = 'modal-input-container';

    Object.values(SettingsKeys).forEach(key => {
        inputContainer.appendChild(ModalInputNumber(key as SettingsKeys));
    })

    modalContent.appendChild(inputContainer);

    const actionsContainer = document.createElement('div');
    actionsContainer.id = 'actions-container';

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => closeModal(true));
    actionsContainer.appendChild(cancelButton);

    const applyButton = document.createElement('button');
    applyButton.type = 'submit';
    applyButton.textContent = 'Apply Settings';
    actionsContainer.appendChild(applyButton);
    modalContent.appendChild(actionsContainer);

    modalDialog.appendChild(modalContent);
    document.body.appendChild(modalDialog);

    function updateModalInputs() {
        // FIXME: Fix this type
        const inputs = inputContainer.querySelectorAll('input[type="number"]') as unknown as HTMLInputElement[];

        inputs.forEach(input => {
            const key = input.name as keyof SettingsStore;
            if (settingsStore[key]) {
                input.value = settingsStore[key].toString();
            }
        });
    }

    DifficultyContainer(updateModalInputs);

    modalDialog.showModal();

    const submitHandler = (e: Event) => {
        e.preventDefault();

        const formData = new FormData(inputContainer);
        const formValues: Record<string, string> = {};

        formData.forEach((value, key) => {
            formValues[key] = value as string;
        });

        // TODO: Remove this when implemented
        formValues.mode = Mode.DEFAULT;
        // FIXME: Fix this type
        setSettings(formValues as unknown as SettingsStore);
        closeModal();
    }

    applyButton.addEventListener('click', submitHandler);

    function closeModal(isCanceling = false) {
        if (isCanceling) {
            setSettings(currentSettingsStoreVals);
        }

        modalDialog.close();
        applyButton.removeEventListener('click', submitHandler);
        document.body.removeChild(modalDialog);
        document.body.removeChild(overlay);
    }

    return modalDialog;
}
