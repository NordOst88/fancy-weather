/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import GLOBAL from '../constants/global';
import I18n from '../i18n/i18n.class';

export default class WeatherModel {
  constructor(city, units, lang) {
    this.city = city;
    this.units = units;
    this.lang = lang;
    this.weatherStates = {
      feels_likeName: 'feels_like',
      humidityName: 'humidity',
      windName: 'wind',
    };
    this.dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    this.queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&lang=${this.lang}&units=${this.units}&APPID=${GLOBAL.OPENWEATHERMAP_KEY}`;
  }

  static getFutureWeather(weatherList) {
    const currentDay = new Date(weatherList[0].dt_txt);
    const startDaysInterval = 1;
    const endDaysInterval = 3;
    const startDate = new Date(currentDay);
    startDate.setDate(startDate.getDate() + startDaysInterval);
    startDate.setHours(0, 0);

    const endDate = new Date(currentDay);
    endDate.setDate(endDate.getDate() + endDaysInterval);
    endDate.setHours(23, 59);

    const futureWeatherValues = weatherList.filter((item) => {
      const currentDate = new Date(item.dt_txt);
      if (currentDate >= startDate && currentDate <= endDate && currentDate.getHours() === 12) {
        return item;
      }
    });
    return futureWeatherValues;
  }

  async getWeather() {
    const response = await fetch(this.queryUrl);

    if (!response.ok) {
      throw response;
    }

    const data = await response.json();
    const weatherList = data.list;
    const threeDaysWeather = WeatherModel.getFutureWeather(weatherList);

    const firstDayDate = new Date(threeDaysWeather[0].dt_txt);
    const firstDayName = I18n.translate(this.dayNames[firstDayDate.getDay()]);
    const secondDayDate = new Date(threeDaysWeather[1].dt_txt);
    const secondDayName = I18n.translate(this.dayNames[secondDayDate.getDay()]);
    const thirdDayDate = new Date(threeDaysWeather[2].dt_txt);
    const thirdDayName = I18n.translate(this.dayNames[thirdDayDate.getDay()]);

    const result = {
      timeZone: data.city.timezone,
      temp: weatherList[0].main.temp,
      description: weatherList[0].weather[0].description,
      icon: weatherList[0].weather[0].icon,
      weatherID: weatherList[0].weather[0].id,
      feels_like: weatherList[0].main.feels_like,
      feels_likeName: I18n.translate(this.weatherStates.feels_likeName),
      humidity: weatherList[0].main.humidity,
      humidityName: I18n.translate(this.weatherStates.humidityName),
      wind: weatherList[0].wind.speed,
      windName: I18n.translate(this.weatherStates.windName),
      firstDay: firstDayName,
      firstDayTemp: threeDaysWeather[0].main.temp,
      firstDayDescription: threeDaysWeather[0].weather[0].description,
      firstDayWind: threeDaysWeather[0].wind.speed,
      firstDayHumidity: threeDaysWeather[0].main.humidity,
      firstDayIcon: threeDaysWeather[0].weather[0].icon,
      secondDay: secondDayName,
      secondDayTemp: threeDaysWeather[1].main.temp,
      secondDayDescription: threeDaysWeather[0].weather[0].description,
      secondDayWind: threeDaysWeather[0].wind.speed,
      secondDayHumidity: threeDaysWeather[0].main.humidity,
      secondDayIcon: threeDaysWeather[1].weather[0].icon,
      thirdDay: thirdDayName,
      thirdDayTemp: threeDaysWeather[2].main.temp,
      thirdDayDescription: threeDaysWeather[0].weather[0].description,
      thirdDayWind: threeDaysWeather[0].wind.speed,
      thirdDayHumidity: threeDaysWeather[0].main.humidity,
      thirdDayIcon: threeDaysWeather[2].weather[0].icon,
    };
    return result;
  }
}
