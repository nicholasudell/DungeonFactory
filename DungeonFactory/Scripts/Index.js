import { initialiseProseMirror, updateProseMirror, destroyProseMirror } from "./ProseMirror/ProseMirror.js";

window.initialiseProseMirror = initialiseProseMirror;
window.updateProseMirror = updateProseMirror;
window.destroyProseMirror = destroyProseMirror;

window.initialiseMenu = function () { 
    $('.sidebar.menu').first()
        .sidebar('attach events', '#itemCloser');
};
