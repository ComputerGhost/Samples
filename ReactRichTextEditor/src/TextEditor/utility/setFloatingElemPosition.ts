const VERTICAL_PADDING = 10;
const HORIZONTAL_PADDING = 5;

export function setFloatingElemPosition(
    element: HTMLElement,
    withinRect: DOMRect,
    aroundRect: DOMRect,
) {
    const elementRect = element.getBoundingClientRect();

    // Prefered position is above and left of `around`.
    let top = aroundRect.top - elementRect.height - VERTICAL_PADDING;
    let left = aroundRect.left - HORIZONTAL_PADDING;

    // If we hit the edges of `within`, try another position.
    if (top - VERTICAL_PADDING < withinRect.top) {
        top = aroundRect.bottom + VERTICAL_PADDING;
    }
    if (left + elementRect.width + HORIZONTAL_PADDING > withinRect.right) {
        left = withinRect.right - elementRect.width - HORIZONTAL_PADDING;
    }
    if (left - HORIZONTAL_PADDING < withinRect.left) {
        left = aroundRect.left + HORIZONTAL_PADDING;
    }

    // Convert absolutes coords to relative coords.
    top -= withinRect.top;
    left -= withinRect.left;

    // Ready to set!
    element.style.left = left + 'px';
    element.style.top = top + 'px';
}