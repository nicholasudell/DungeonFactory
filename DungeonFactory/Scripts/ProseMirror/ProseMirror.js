import { EditorState } from "prosemirror-state"
import { EditorView } from "prosemirror-view"
import { undo, redo, history } from "prosemirror-history"
import { keymap } from "prosemirror-keymap"
import { dropCursor } from "prosemirror-dropcursor"
import { gapCursor } from "prosemirror-gapcursor"
import { baseKeymap } from "prosemirror-commands"
import { buildInputRules } from "./InputRules.js"
import { buildKeymap } from "./Keymap.js"
import {
    schema,
    defaultMarkdownParser,
    defaultMarkdownSerializer
} from "prosemirror-markdown"

class ProseMirrorView {
    constructor(target, content) {
        this.view = new EditorView(target, {
            state: EditorState.create({
                doc: defaultMarkdownParser.parse(content),
                plugins: [
                    buildInputRules(schema),
                    history(),
                    keymap(buildKeymap(schema)),
                    keymap({ "Mod-z": undo, "Mod-y": redo }),
                    keymap(baseKeymap),
                    dropCursor(),
                    gapCursor()
                ]
            })
        })
    }

    get content() {
        return defaultMarkdownSerializer.serialize(this.view.state.doc)
    }
    focus() { this.view.focus() }
    destroy() { this.view.destroy() }
}

function initialiseProseMirror(editorElementId, contentElementId) {

    let editor = document.querySelector(editorElementId);
    let content = document.querySelector(contentElementId).innerHTML;

    window.view = new ProseMirrorView(editor, content)
}

export { initialiseProseMirror }