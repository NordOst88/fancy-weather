import GLOBAL from '../constants/global';

export default class BackgroundsModel {
  constructor() {
    this.query = GLOBAL.DEFAULT_BACKGROUND_QUERY;
  }

  queryGenerator(timezone) {
    const date = new Date();
    const currentTimeZone = -date.getTimezoneOffset() / 60;
    const timeZone = timezone / 3600;
    const timeZoneOffset = timeZone - currentTimeZone;
    date.setHours(date.getHours() + timeZoneOffset);
    const month = date.getMonth();
    const hour = date.getHours();

    let seasоn = GLOBAL.DEFAULT_SEASON;
    if ((month >= 0 && month <= 1) || month === 11) seasоn = 'winter';
    if (month >= 2 && month <= 4) seasоn = 'spring';
    if (month >= 5 && month <= 7) seasоn = 'summer';
    if (month >= 8 && month <= 10) seasоn = 'autumn';

    let timesOfDay = GLOBAL.DEFAULT_TIMES_OF_DAY;
    if (hour >= 0 && hour <= 5) timesOfDay = 'night';
    if (hour >= 6 && hour <= 11) timesOfDay = 'morning';
    if (hour >= 12 && hour <= 17) timesOfDay = 'day';
    if (hour >= 18 && hour <= 23) timesOfDay = 'evening';
    this.query = `${seasоn}, ${timesOfDay}`;
  }

  async getRandomBackgroundURL(timezone) {
    this.queryGenerator(timezone);
    console.log(`Request to image API: ${this.query}`);
    const { query } = this;
    const queryUrl = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${query}&client_id=${GLOBAL.UNSPLASH_KEY}`;
    const response = await fetch(queryUrl);
    if (response.ok) {
      const data = await response.json();
      return data.urls.regular;
    }
    return 'https://i.pinimg.com/originals/21/df/9f/21df9f5e0a33adb568ef57d5753f6618.jpg';
  }
}
