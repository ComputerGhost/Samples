import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalEditor } from "lexical";
import { useEffect } from "react";

export type ExportFunc = (editor: LexicalEditor) => void;
export type ImportFunc = (editor: LexicalEditor) => void;

interface Props {
    doExport?: ExportFunc,
    doImport?: ImportFunc,
};

export default function ExportPlugin({
    doExport,
    doImport,
}: Props) {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if (doExport && editor) {
            doExport(editor);
        }
    }, [doExport]);

    useEffect(() => doImport && editor && doImport(editor), [doImport]);

    return <></>;
}
