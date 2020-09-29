/* eslint-disable class-methods-use-this */
import './app.view.scss';

export default class AppView {
  constructor(backgroundURL) {
    this.backgroundURL = backgroundURL;
  }

  setRandomBackground() {
    document.body.setAttribute('style', `background-image: linear-gradient(rgba(8, 15, 26, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%), url(${this.backgroundURL});`);
  }

  waiter(state) {
    const loadingIndicator = document.getElementById('loading-indicator');
    const weather = document.getElementById('weather');
    const location = document.getElementById('location');
    location.innerHTML = '';
    weather.innerHTML = '';
    if (state === 'hide') {
      loadingIndicator.classList.add('hidden');
    } else {
      loadingIndicator.classList.remove('hidden');
    }
  }
}
