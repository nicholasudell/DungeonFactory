import { EditorState, Plugin } from "prosemirror-state"
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
    constructor(target, content, onChange) {
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
            }),
            dispatchTransaction(tr) {
                const newState = this.state.apply(tr);
                this.updateState(newState);
                onChange(tr);
            }
        })
    }

    get content() {
        return defaultMarkdownSerializer.serialize(this.view.state.doc)
    }
    focus() { this.view.focus() }
    destroy() { this.view.destroy() }
}

function initialiseProseMirror(editorElementId, content, dotNetHelper) {

    let editor = document.querySelector(editorElementId);

    var proseMirror = new ProseMirrorView(editor, content, (tr) => {
        var updatedContent = proseMirror.content;
        dotNetHelper.invokeMethodAsync('UpdateContent', updatedContent);
    });

    window.view = proseMirror;
}

function updateProseMirror(editorElementId, content, dotNetHelper) {

    let editor = document.querySelector(editorElementId);

    let proseMirror = window.view;

    proseMirror.destroy();

    proseMirror = new ProseMirrorView(editor, content, (tr) => {
        var updatedContent = proseMirror.content;
        dotNetHelper.invokeMethodAsync('UpdateContent', updatedContent);
    });

    window.view = proseMirror;
}

function destroyProseMirror() {

    let proseMirror = window.view;

    proseMirror.destroy();

    window.view = null;
}

export { updateProseMirror, initialiseProseMirror, destroyProseMirror }