import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./FloatingToolbarPlugin.module.css";

function getDOMRangeRect(selection: Selection): DOMRect {
    const range = selection.getRangeAt(0);
    return range.getBoundingClientRect();
}

function setFloatingElemPosition(
    targetRect: DOMRect,
    floatingElem: HTMLElement,
    containerElem: HTMLElement,
) {
    const floatingElemRect = floatingElem.getBoundingClientRect();

    const VERTICAL_OFFSET = -10;
    const HORIZONTAL_OFFSET = -5;

    // Align above and to the left of the selection.
    let top = targetRect.top - floatingElemRect.height + VERTICAL_OFFSET;
    let left = targetRect.left + HORIZONTAL_OFFSET;

    // If we're running past top or bottom edges, adjust alignment
    const containerElemRect = containerElem.getBoundingClientRect();
    if (top < containerElemRect.top) {
        top = targetRect.bottom - VERTICAL_OFFSET;
    }
    if (left + floatingElemRect.width > containerElemRect.right) {
        left = containerElemRect.right - floatingElemRect.width - HORIZONTAL_OFFSET;
    }

    top -= containerElemRect.top;
    left -= containerElemRect.left;

    floatingElem.style.left = left + 'px';
    floatingElem.style.top = top + 'px';
}

interface Props {
    anchor: HTMLDivElement | null,
    children: JSX.Element | JSX.Element[],
}

export default function FloatingToolbarPlugin({
    anchor,
    children,
}: Props) {
    const toolbarRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [editor] = useLexicalComposerContext();

    function update() {
        if (toolbarRef.current === null) {
            return;
        }
        const nativeSelection = window.getSelection()!;
        const rangeRect = getDOMRangeRect(nativeSelection);
        const rootElement = editor.getRootElement()!;
        setFloatingElemPosition(rangeRect, toolbarRef.current, rootElement);
    }

    useEffect(() => {
        return editor.registerUpdateListener(update);
    }, [editor]);
    
    if (!anchor) {
        return null;
    }

    return createPortal(
        <div ref={toolbarRef} className={`${styles.toolbar} rounded`}>
            {children}
        </div>,
        anchor,
    );
}
