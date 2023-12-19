import { LexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalEditor } from "lexical";
import { useState } from "react";
import { Button, ButtonGroup, Form, FormControl } from "react-bootstrap";
import TextEditor from "./TextEditor";
import { ExportFunc } from "./TextEditor/plugins/ExportPlugin";

function App() {
    const [serialized, setSerialized] = useState<string>("");
    const [doExport, setDoExport] = useState<ExportFunc>();

    const onImportClick = () => {
        // probably works just the same as the export.
    };

    const onExportClick = () => {
        setDoExport(() => (editor: LexicalEditor) => {
            setSerialized(JSON.stringify(editor.getEditorState()));
        });
    };

    return (
        <main className="p-3">
            <h1>Rich Text Editor Test</h1>
            <div className="mb-3">
                <FormControl type="text" placeholder="Regular input for comparison." />
            </div>
            <TextEditor
                placeholder="Start your content here."
                doExport={doExport}
            />
            <ButtonGroup className="my-3">
                <Button variant="outline-primary" onClick={onImportClick}>Import Data</Button>
                <Button variant="outline-primary" onClick={onExportClick}>Export Data</Button>
            </ButtonGroup>
            <Form.Control as="textarea" rows={10} readOnly value={serialized} />
        </main>
    );
}

export default App
