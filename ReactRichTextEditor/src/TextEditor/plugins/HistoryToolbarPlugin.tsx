import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { CAN_REDO_COMMAND, CAN_UNDO_COMMAND, COMMAND_PRIORITY_LOW, REDO_COMMAND, UNDO_COMMAND } from 'lexical';
import { useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";

interface Props {
    buttonVariant?: string,
};

export default function HistoryToolbarPlugin({
    buttonVariant = "primary",
}: Props) {
    const [editor] = useLexicalComposerContext();
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);

    useEffect(() => {
        return mergeRegister(
            editor.registerCommand(
                CAN_UNDO_COMMAND,
                (payload) => {
                    setCanUndo(payload);
                    return false;
                },
                COMMAND_PRIORITY_LOW
            ),
            editor.registerCommand(
                CAN_REDO_COMMAND,
                (payload) => {
                    setCanRedo(payload);
                    return false;
                },
                COMMAND_PRIORITY_LOW
            )
        );
    }, [editor]);

    return (
        <ButtonGroup>
            <Button
                aria-label="Undo"
                disabled={!canUndo}
                onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
                variant={buttonVariant}
            >
                <i className='fa-solid fa-fw fa-rotate-left'></i>
            </Button>
            <Button
                aria-label="Redo"
                disabled={!canRedo}
                onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
                variant={buttonVariant}
            >
                <i className='fa-solid fa-fw fa-rotate-right'></i>
            </Button>
        </ButtonGroup>
    );
}
