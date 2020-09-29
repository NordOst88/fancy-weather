import GLOBAL from '../constants/global';
import ControlsView from '../views/controls/controls.view';

export default class GeocodingModel {
  constructor(city, lang) {
    this.queryUrl = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${GLOBAL.OPENCAGEDATA_KEY}&pretty=1&no_annotations=1&language=${lang}`;
    this.controlsView = new ControlsView();
  }

  async getGeometry() {
    let result = null;
    const response = await fetch(this.queryUrl);
    const data = await response.json();
    try {
      result = {
        city: data.results[0].components.city
              || data.results[0].components.town
              || data.results[0].components.village
              || data.results[0].components.county
              || data.results[0].components.state,
        country: data.results[0].components.country,
        lat: data.results[0].geometry.lat,
        lng: data.results[0].geometry.lng,
      };
    } catch (error) {
      this.controlsView.showErrorMessage();
    }
    return result;
  }
}
