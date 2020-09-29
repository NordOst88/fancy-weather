/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import './location.view.scss';
import markup from './location.view.marko';
import GLOBAL from '../../constants/global';

export default class LocationView {
  render(data) {
    const location = document.getElementById('location');
    location.innerHTML = '';
    markup.renderSync(data).appendTo(location);

    mapboxgl.accessToken = GLOBAL.MAPBOX_KEY;
    const map = new mapboxgl.Map({
      container: 'location__map',
      center: [data.lng, data.lat],
      zoom: 10,
      style: 'mapbox://styles/mapbox/satellite-streets-v11',
    });
    const marker = new mapboxgl.Marker().setLngLat([data.lng, data.lat]).addTo(map);
  }
}
