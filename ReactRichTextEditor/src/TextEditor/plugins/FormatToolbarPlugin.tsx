import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from "lexical";
import { useEffect, useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

export default function FormatToolbarPlugin() {
    const [editor] = useLexicalComposerContext();
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);

    function update() {
        editor.getEditorState().read(() => {
            if (editor.isComposing()) {
                return;
            }

            const selection = $getSelection();
            if (!$isRangeSelection(selection)) {
                return;
            }

            setIsBold(selection.hasFormat('bold'));
            setIsItalic(selection.hasFormat('italic'));
            setIsUnderline(selection.hasFormat('underline'));
            setIsStrikethrough(selection.hasFormat('strikethrough'));
        });
    }

    useEffect(() => {
        return editor.registerUpdateListener(() => {
            update();
        });
    }, [editor]);

    return (
        <ButtonGroup>
            <ToggleButton
                aria-label="Format bold"
                checked={isBold}
                id="toggle-bold"
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
                type="checkbox"
                value="1"
            >
                <i className='fa-solid fa-fw fa-bold'></i>
            </ToggleButton>
            <ToggleButton
                aria-label="Format italics"
                checked={isItalic}
                id="toggle-italics"
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
                type="checkbox"
                value="1"
            >
                <i className='fa-solid fa-fw fa-italic'></i>
            </ToggleButton>
            <ToggleButton
                aria-label="Format underline"
                checked={isUnderline}
                id="toggle-underline"
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
                type="checkbox"
                value="1"
            >
                <i className='fa-solid fa-fw fa-underline'></i>
            </ToggleButton>
            <ToggleButton
                aria-label="Format strikethrough"
                checked={isStrikethrough}
                id="toggle-strikethrough"
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")}
                type="checkbox"
                value="1"
            >
                <i className='fa-solid fa-fw fa-strikethrough'></i>
            </ToggleButton>
        </ButtonGroup>
    );
}
