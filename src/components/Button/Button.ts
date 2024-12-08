import { ButtonType } from "../../types/enums"

type Button = {
    textContent: string
    type: ButtonType
    id?: string
    classNames?: string[]
    onClick?: (() => void) | null
}

export function Button({
    textContent,
    type,
    id,
    classNames,
    onClick = null
}: Button) {
    const button = document.createElement('button');

    if (id) {
        button.id = id;
    };

    if (classNames?.length) {
        button.classList.add(...classNames);
    };

    button.type = type;
    button.textContent = textContent;

    if (onClick) {
        button.addEventListener('click', onClick);
    }

    return button;
}
