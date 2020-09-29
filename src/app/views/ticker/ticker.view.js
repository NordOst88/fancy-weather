import './ticker.view.scss';
import markup from './ticker.view.marko';

export default class TickerView {
  render(data) {
    const ticker = document.getElementById('ticker-wrap');
    ticker.innerHTML = '';
    markup.renderSync(data).appendTo(ticker);
  }
}
