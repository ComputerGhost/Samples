import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import styles from "./index.module.css";
import HistoryToolbarPlugin from "./plugins/HistoryToolbarPlugin";
import TopToolbarPlugin from "./plugins/TopToolbarPlugin";
import { useState } from "react";
import FormatToolbarPlugin from "./plugins/FormatToolbarPlugin";
import FloatingToolbarPlugin from "./plugins/FloatingToolbarPlugin";

interface Props {
    placeholder?: string,
}

export default function TextEditor({
    placeholder,
}: Props) {
    const [floatingAnchor, setFloatingAnchor] = useState<HTMLDivElement | null>(null);

    const initialConfig = {
        namespace: 'MyEditor',
        onError: (error: Error) => console.error(error),
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <TopToolbarPlugin>
                <HistoryToolbarPlugin />
                <FormatToolbarPlugin />
            </TopToolbarPlugin>
            <div className={styles.contentContainer} ref={setFloatingAnchor}>
                <RichTextPlugin
                    contentEditable={<ContentEditable className="form-control rounded-top-0" />}
                    placeholder={<div className={`${styles.placeholder} text-muted ps-3 pt-2`}>{placeholder}</div>}
                    ErrorBoundary={LexicalErrorBoundary}
                />
            </div>
            <FloatingToolbarPlugin anchor={floatingAnchor}>
                <FormatToolbarPlugin />
            </FloatingToolbarPlugin>
            <HistoryPlugin />
        </LexicalComposer>
    );
}
