mapboxgl.accessToken = 'pk.eyJ1IjoiaGFuMTIzdGgiLCJhIjoiY2xrcG56cnR1MHoxMjNwa3k3MXdvdGs4ayJ9.OLRvMH5R4M-IlWp5vqMouQ';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [0, 0],
  zoom: 1
});

var destinationLngLat = [-102.55420403477605, 23.916412487175915];

var destinationMarker = new mapboxgl.Marker()
  .setLngLat(destinationLngLat)
  .addTo(map);

var directionsAPI = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + '-102.55420403477605' + ',' + '23.916412487175915' + ';' + destinationLngLat[0] + ',' + destinationLngLat[1] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;
fetch(directionsAPI)
  .then(response => response.json())
  .then(data => {
 
    console.log(data); 
    map.addLayer({
      'id': 'route',
      'type': 'line',
      'source': {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': data.routes[0].geometry
        }
      },
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': '#888',
        'line-width': 8
      }
    });
  })
  .catch(error => {
    console.error('Error fetching directions:', error);
  });