/* eslint-disable class-methods-use-this */
import './weather.view.scss';
import markup from './weather.view.marko';
import getDateTime from '../../helpers/getDateTime.helper';

export default class WeatherView {
  render(data) {
    const weather = document.getElementById('weather');
    weather.innerHTML = '';
    markup.renderSync(data).appendTo(weather);
  }

  setDateTime(data) {
    const dateDiv = document.getElementById('date_time');
    if (dateDiv) {
      dateDiv.innerText = getDateTime(data.timeZone);
    }
  }
}
