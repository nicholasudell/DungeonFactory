import { initialiseProseMirror, updateProseMirror, destroyProseMirror } from "./ProseMirror/ProseMirror.js";
import { initialiseMap, addMarker } from "./Leaflet/leaflet.js";

window.initialiseProseMirror = initialiseProseMirror;
window.updateProseMirror = updateProseMirror;
window.destroyProseMirror = destroyProseMirror;
window.initialiseMap = initialiseMap;
window.addMarker = addMarker;

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