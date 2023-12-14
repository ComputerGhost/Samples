import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isParagraphNode, $isRangeSelection, $isTextNode, BaseSelection, FORMAT_TEXT_COMMAND } from "lexical";
import { useEffect, useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { getLatestSelectedNode } from "../utility/selection";

interface Props {
    autoHide?: boolean
    buttonVariant?: string,
}

export default function FormatToolbarPlugin({
    autoHide = false,
    buttonVariant = "primary",
}: Props) {
    const [isActive, setIsActive] = useState(false);
    const [editor] = useLexicalComposerContext();
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);

    function updateButtons(selection: BaseSelection | null) {
        if ($isRangeSelection(selection)) {
            setIsBold(selection.hasFormat('bold'));
            setIsItalic(selection.hasFormat('italic'));
            setIsUnderline(selection.hasFormat('underline'));
            setIsStrikethrough(selection.hasFormat('strikethrough'));
        }
    }

    function updateIsActive(selection: BaseSelection | null) {
        setIsActive(false);
        if (!$isRangeSelection(selection)) {
            return;
        }
        if (selection.getTextContent().replace(/\n/g, '') === "") {
            return;
        }
        const node = getLatestSelectedNode(selection);
        setIsActive($isTextNode(node) || $isParagraphNode(node));
    }

    function update() {
        editor.getEditorState().read(() => {
            if (editor.isComposing()) {
                return;
            }
            const selection = $getSelection();
            updateButtons(selection);
            updateIsActive(selection);
        });
    }

    useEffect(() => {
        return editor.registerUpdateListener(() => {
            update();
        });
    }, [editor]);

    if (autoHide && !isActive) {
        return null;
    }

    return (
        <ButtonGroup>
            <ToggleButton
                aria-label="Format bold"
                checked={isBold}
                id="toggle-bold"
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
                type="checkbox"
                value="1"
                variant={buttonVariant}
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
                variant={buttonVariant}
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
                variant={buttonVariant}
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
                variant={buttonVariant}
            >
                <i className='fa-solid fa-fw fa-strikethrough'></i>
            </ToggleButton>
        </ButtonGroup>
    );
}
