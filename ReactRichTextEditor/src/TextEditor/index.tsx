import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import styles from "./index.module.css";
import HistoryToolbarPlugin from "./plugins/HistoryToolbarPlugin";
import TopToolbarPlugin from "./plugins/TopToolbarPlugin";
import { useState } from "react";
import FormatToolbarPlugin from "./plugins/FormatToolbarPlugin";
import FloatingToolbarPlugin from "./plugins/FloatingToolbarPlugin";
import BlockTypeToolbarPlugin from "./plugins/BlockTypeToolbarPlugin";
import { ListItemNode, ListNode } from "@lexical/list";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";

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
        nodes: [
            HeadingNode,
            //LinkNode,
            ListNode,
            ListItemNode,
            QuoteNode,
        ],
        theme: {
            list: {
            },
        },
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <TopToolbarPlugin>
                <HistoryToolbarPlugin buttonVariant="outline-light" />
                <BlockTypeToolbarPlugin buttonVariant="outline-light" />
                <FormatToolbarPlugin buttonVariant="outline-light" />
            </TopToolbarPlugin>
            <div className={styles.contentContainer} ref={setFloatingAnchor}>
                <RichTextPlugin
                    contentEditable={<ContentEditable className="form-control rounded-top-0" />}
                    placeholder={<div className={`${styles.placeholder} text-muted ps-3 pt-2`}>{placeholder}</div>}
                    ErrorBoundary={LexicalErrorBoundary}
                />
            </div>
            {/*<FloatingToolbarPlugin anchor={floatingAnchor}>*/}
            {/*    <FormatToolbarPlugin autoHide={true} />*/}
            {/*</FloatingToolbarPlugin>*/}
            <HistoryPlugin />
            <ListPlugin />
        </LexicalComposer>
    );
}
