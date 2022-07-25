import { initialiseProseMirror, updateProseMirror, destroyProseMirror } from "./ProseMirror/ProseMirror.js";

window.initialiseProseMirror = initialiseProseMirror;
window.updateProseMirror = updateProseMirror;
window.destroyProseMirror = destroyProseMirror;

window.initialiseMenu = function () { 
    $('.sidebar').first()
        .sidebar('setting', {
            dimPage : false
        })
        .sidebar('attach events', '#itemCloser')
        .sidebar('attach events', '.sidebar-closer');
};

window.getValueOfContentEditable = function (element) {
    return element.innerText;
}