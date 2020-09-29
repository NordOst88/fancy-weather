import BackgroundsModel from '../models/backgrounds.model';
import GeolocationModel from '../models/geolocation.model';
import GeocodingModel from '../models/geocoding.model';
import WeatherModel from '../models/weather.model';
import I18n from '../i18n/i18n.class';
import dataGenerator from '../helpers/dataGenerator.helper';
import ControlsView from '../views/controls/controls.view';
import WeatherView from '../views/weather/weather.view';
import LocationView from '../views/location/location.view';
import TickerView from '../views/ticker/ticker.view';
import AppView from '../views/app/app.view';
import GLOBAL from '../constants/global';

export default class MainController {
  constructor() {
    this.weatherView = new WeatherView();
    this.locationView = new LocationView();
    this.controlsView = new ControlsView();
    this.tickerView = new TickerView();
    this.backgroundsModel = new BackgroundsModel();
    this.appView = new AppView();
    this.city = GLOBAL.DEFAULT_CITY;
    this.units = this.controlsView.units;
    this.lang = I18n.lang;
    this.prevCity = GLOBAL.DEFAULT_CITY;
  }

  async start() {
    this.controlsView.localization();
    this.controlsView.updateBackgroundBtnListener();
    this.controlsView.changeUnitsBtnListener();
    this.controlsView.changeLangMenuListener();
    this.controlsView.searchBlockListener();
    this.controlsView.voiceListener();

    this.appView.waiter(GLOBAL.WAITER.SHOW);
    const geolocation = new GeolocationModel();
    this.city = await geolocation.getCity();
    await this.getData(this.city, this.units, this.lang);
    const randomBackgroundURL = await this.backgroundsModel
      .getRandomBackgroundURL(this.data.timeZone);
    this.controlsView.timezone = this.data.timeZone;
    this.appView.backgroundURL = randomBackgroundURL;
    this.appView.setRandomBackground();
    this.appView.waiter(GLOBAL.WAITER.HIDE);

    this.weatherView.render(this.data);
    this.locationView.render(this.data);
    this.tickerView.render(this.data);
    this.subscribeToEvents();
    setInterval(() => this.weatherView.setDateTime(this.data), GLOBAL.TIME_UPDATE_INTERVAL);
  }

  subscribeToEvents() {
    this.controlsView.onUnitChange = async (unit) => {
      this.appView.waiter(GLOBAL.WAITER.SHOW);
      localStorage.setItem('units', unit);
      this.units = unit;
      await this.getData(this.city, unit, this.lang);
      this.appView.waiter(GLOBAL.WAITER.HIDE);
      this.weatherView.render(this.data);
      this.locationView.render(this.data);
      this.tickerView.render(this.data);
    };

    this.controlsView.onLangChange = async (lang) => {
      this.appView.waiter(GLOBAL.WAITER.SHOW);
      this.lang = lang;
      await this.getData(this.city, this.units, lang);
      this.appView.waiter(GLOBAL.WAITER.HIDE);
      this.weatherView.render(this.data);
      this.locationView.render(this.data);
      this.tickerView.render(this.data);
    };

    this.controlsView.request = async (cityRequest) => {
      this.appView.waiter(GLOBAL.WAITER.SHOW);
      this.city = cityRequest;
      await this.getData(cityRequest, this.units, this.lang);
      const randomBackgroundURL = await this.backgroundsModel
        .getRandomBackgroundURL(this.data.timeZone);
      this.controlsView.timezone = this.data.timeZone;
      this.appView.backgroundURL = randomBackgroundURL;
      this.appView.setRandomBackground();
      this.appView.waiter(GLOBAL.WAITER.HIDE);
      this.weatherView.render(this.data);
      this.locationView.render(this.data);
      this.tickerView.render(this.data);
    };
  }

  async getData(city, units, lang) {
    try {
      this.geocoding = new GeocodingModel(city, lang);
      this.geometry = await this.geocoding.getGeometry();
      if (this.geometry === null) {
        this.getData(this.prevCity, units, lang);
        return;
      }
      this.weather = new WeatherModel(city, units, lang);
      this.weatherToday = await this.weather.getWeather();
      this.data = dataGenerator(this.geometry, this.weatherToday);
      this.prevCity = city;
    } catch (error) {
      this.controlsView.showErrorMessage();
      if (error.status === 404) {
        this.getData(this.prevCity, units, lang);
      } else {
        alert('Something went wrong');
      }
    }
  }
}
