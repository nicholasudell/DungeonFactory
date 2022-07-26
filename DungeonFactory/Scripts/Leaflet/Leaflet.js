import L from 'leaflet';

function initialiseMap(mapUrl, pixelsPerUnit, mapWidth, mapHeight) {
    var map = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: -5,
        attributionControl: false,
        zoomControl: false
    });

    var bounds = [[0, 0],[mapHeight, mapWidth]];

    L.imageOverlay(mapUrl, bounds).addTo(map);

    map.fitBounds(bounds);

    return map;
}

function addMarker(map, x, y, text) {
    L.marker(L.LatLng(y, x), {title: text})
        .addTo(map)
        .bindPopup(text);
}

export { initialiseMap, addMarker }