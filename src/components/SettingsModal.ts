import { SettingsKeys } from "../types/enums";
import { ModalInputNumber } from "./InputNumber";

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
    });

    modalContent.appendChild(inputContainer);

    const actionsContainer = document.createElement('div');
    actionsContainer.id = 'actions-container';

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    actionsContainer.appendChild(cancelButton);

    const applyButton = document.createElement('button');
    applyButton.type = 'submit';
    applyButton.textContent = 'Apply Settings';
    actionsContainer.appendChild(applyButton);
    modalContent.appendChild(actionsContainer);

    modalDialog.appendChild(modalContent);
    document.body.appendChild(modalDialog);

    return { modalDialog, applyButton, inputContainer, cancelButton };
}
