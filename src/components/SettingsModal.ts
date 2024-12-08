import { setSettings } from "../stores/settingsStore";
import { Mode, SettingsKeys } from "../types/enums";
import { SettingsStore } from "../types/types";
import { DifficultyContainer } from "./DifficultyContainer";
import { ModalInputNumber } from "./ModalInputNumber";

export function SettingsModal() {
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

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', closeModal);
    actionsContainer.appendChild(closeButton);

    const applyButton = document.createElement('button');
    applyButton.type = 'submit';
    applyButton.textContent = 'Apply Settings';
    actionsContainer.appendChild(applyButton);
    modalContent.appendChild(actionsContainer);

    modalDialog.appendChild(modalContent);
    document.body.appendChild(modalDialog);
    DifficultyContainer(false);

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

    function closeModal() {
        modalDialog.close();
        applyButton.removeEventListener('click', submitHandler);
        document.body.removeChild(modalDialog);
        document.body.removeChild(overlay);
    }

    return modalDialog;
}
