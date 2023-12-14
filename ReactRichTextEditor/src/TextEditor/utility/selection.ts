import { $isAtNodeEnd } from "@lexical/selection";
import {  $isNodeSelection, $isRangeSelection, ElementNode, GridSelection, LexicalNode, NodeSelection, RangeSelection, TextNode } from "lexical";

type AnySelection = GridSelection | NodeSelection | RangeSelection;

function getNodes(selection: AnySelection): LexicalNode[] {
    if ($isNodeSelection(selection)) {
        return selection.getNodes();
    }

    if ($isRangeSelection(selection)) {
        const start = selection.anchor.getNode();
        const end = selection.focus.getNode();
        return start.getNodesBetween(end);
    }

    return [];
}

// Returns the most recently selected node in the selection.
export function getLatestSelectedNode(
    selection: RangeSelection,
): TextNode | ElementNode {
    const anchorNode = selection.anchor.getNode();
    const focusNode = selection.focus.getNode();
    if (anchorNode === focusNode) {
        return anchorNode;
    }

    if (selection.isBackward()) {
        const focus = selection.focus;
        return $isAtNodeEnd(focus) ? anchorNode : focusNode;
    } else {
        const anchor = selection.anchor;
        return $isAtNodeEnd(anchor) ? anchorNode : focusNode;
    }
}


export function getTopLevelElements(selection: AnySelection): ElementNode[] {
    const isUnique = <T>(v: T, i: number, a: T[]) => a.indexOf(v) === i;
    return getNodes(selection)
        .map(node => node.getTopLevelElementOrThrow() as ElementNode)
        .filter(isUnique);
}
