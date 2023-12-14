import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { setFloatingElemPosition } from "../utility/setFloatingElemPosition";
import styles from "./FloatingToolbarPlugin.module.css";

interface Props {
    anchor: HTMLDivElement | null,
    children: JSX.Element | JSX.Element[],
}

export default function FloatingToolbarPlugin({
    anchor,
    children,
}: Props) {
    const toolbarRef = useRef<HTMLDivElement | null>(null);
    const [editor] = useLexicalComposerContext();

    function update() {
        if (toolbarRef.current === null) {
            return;
        }

        const selection = window.getSelection();
        // Null(ish) if invisible element or fresh page load.
        if (selection === null || selection.type === "None") {
            return;
        }

        const container = editor.getRootElement();
        // Should be nonnull if toolbarRef is set, but we'll check anyways.
        if (container === null) {
            return;
        }

        const selectionRect = selection.getRangeAt(0).getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        setFloatingElemPosition(toolbarRef.current, containerRect, selectionRect);
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
