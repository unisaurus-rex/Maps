// don't need to import leaflet because it's included as a cdn in index.html

export default function(mapContainerId) {
  // L = Leaflet.js object
  var map = L.map(mapContainerId);

  map.options.minZoom = 4;
  map.setView([37.8, -96.9], 4);

  // add tile layer to map
  L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: ['a','b','c']
  }).addTo( map );

  return map;
}
