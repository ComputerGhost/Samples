import { Button, ButtonGroup, FormControl } from "react-bootstrap";
import TextEditor from "./TextEditor";

function App() {
    return (
        <main className="p-3">
            <h1>Rich Text Editor Test</h1>
            <ButtonGroup className="mb-3">
                <Button variant="outline-primary">Load Data</Button>
                <Button variant="outline-primary">Save Data</Button>
            </ButtonGroup>
            <div className="mb-3">
                <FormControl type="text" placeholder="Regular input for comparison." />
            </div>
            <TextEditor placeholder="Start your content here." />
        </main>
    );
}

export default App
