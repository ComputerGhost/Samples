import { $isListNode, INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createHeadingNode, $createQuoteNode, $isHeadingNode, $isQuoteNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import { $createParagraphNode, $getSelection, $isParagraphNode, $isRangeSelection, ElementNode, LexicalEditor } from "lexical";
import { ReactElement, useEffect, useState } from "react";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import { getTopLevelElements } from "../utility/selection";

interface MenuItem {
    label: ReactElement,
    onClick: (editor: LexicalEditor) => void,
    isApplicable: (node: ElementNode) => boolean,
}

const menuItems: MenuItem[] = [
    {
        label: <><i className="fa-solid fa-fw fa-paragraph"></i> Paragraph</>,
        onClick: editor => editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createParagraphNode());
            }
        }),
        isApplicable: node => $isParagraphNode(node),
    },
    ...([1, 2, 3] as const).map(n => ({
        label: <><i className="fa-solid fa-fw fa-heading"></i> Heading {n}</>,
        onClick: editor => editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createHeadingNode(`h${n}`));
            }
        }),
        isApplicable: node => $isHeadingNode(node) && node.getTag() === `h${n}`,
    }) as MenuItem),
    {
        label: <><i className="fa-solid fa-fw fa-quote-left"></i> Quote</>,
        onClick: editor => editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createQuoteNode());
            }
        }),
        isApplicable: node => $isQuoteNode(node),
    },
    {
        label: <><i className="fa-solid fa-fw fa-list-ul"></i> Bulleted List</>,
        onClick: editor => {
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        },
        isApplicable: node => $isListNode(node) && node.getTag() === "ul",
    },
    {
        label: <><i className="fa-solid fa-fw fa-list-ol"></i> Numbered List</>,
        onClick: editor => {
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        },
        isApplicable: node => $isListNode(node) && node.getTag() === "ol",
    },
    {
        label: <><i className="fa-solid fa-fw fa-image"></i> Image</>,
        onClick: editor => { },
        isApplicable: node => false,
    },
    {
        label: <><i className="fa-solid fa-fw fa-file-code"></i> Embed</>,
        onClick: editor => { },
        isApplicable: node => false,
    },
];

function getFirstApplicableMenuItem(nodes: ElementNode[]) {
    const doesApplyToAllNodes = (menuItem: MenuItem) =>
        nodes.every(node => menuItem.isApplicable(node))
    return menuItems.find(menuItem => doesApplyToAllNodes(menuItem));
}

interface Props {
    buttonVariant?: string,
};

export default function BlockTypeToolbarPlugin({
    buttonVariant = "primary",
}: Props) {
    const [editor] = useLexicalComposerContext();
    const [selectedItem, setSelectedItem] = useState<MenuItem | undefined>();

    function onClick(menuItem: MenuItem) {
        menuItem.onClick(editor);
    }

    function onEditorUpdate() {
        const selection = $getSelection();
        if (selection) {
            const selectedNodes = getTopLevelElements(selection);
            const firstMatch = getFirstApplicableMenuItem(selectedNodes);
            setSelectedItem(firstMatch);
        }
    }

    useEffect(() => {
        return editor.registerUpdateListener(() => {
            editor.getEditorState().read(onEditorUpdate);
        });
    }, [editor]);

    return (
        <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle variant={buttonVariant}>
                {selectedItem?.label}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {menuItems.map((item, index) => (
                    <Dropdown.Item key={index} onClick={() => onClick(item)}>
                        {item.label}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}
