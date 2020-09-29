import GLOBAL from '../constants/global';

export default class GeolocationModel {
  constructor() {
    this.queryUrl = `https://ipinfo.io/json?token=${GLOBAL.IPINFO_KEY}`;
  }

  async getCity() {
    const response = await fetch(this.queryUrl);
    if (response.ok) {
      const data = await response.json();
      return data.city;
    }
    return GLOBAL.DEFAULT_CITY;
  }
}
