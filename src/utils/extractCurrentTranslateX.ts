/**
 * Since CSS Transform only changes the visual appearance of an element 
 * but doesn't update the DOM I had to implement a way to retrieve the actual
 * translateX applied to a given shell.
 * 
 * Without this function I was getting snapping effects because I was trying
 * to reset the transform property eventhough I thought I had the right positions
 */
export const extractCurrentTranslateX = (element: HTMLElement): number => {
    const transform = window.getComputedStyle(element).transform;

    if (transform === "none") {
        return 0;
    }

    const matrix = new DOMMatrix(transform);
    return matrix.m41;
};
