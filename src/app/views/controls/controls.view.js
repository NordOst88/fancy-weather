import './controls.view.scss';
import BackgroundsModel from '../../models/backgrounds.model';
import AppView from '../app/app.view';
import I18n from '../../i18n/i18n.class';
import DOM_ELEMENTS from './DOMelements';
import GLOBAL from '../../constants/global';

export default class ControlsView {
  constructor() {
    this.onUnitChange = null;
    this.onLangChange = null;
    this.request = null;
    this.query = GLOBAL.DEFAULT_BACKGROUND_QUERY;
    this.lang = I18n.lang;
    this.units = localStorage.getItem('units') || GLOBAL.DEFAULT_UNITS;
    this.timezone = null;
    this.elements = {
      inputBtnValue: 'Search',
      inputPlaceholderValue: 'Search_city',
      inputPlaceholderError: 'Incorrect_data',
      inputPlaceholderVoice: 'what_place',
    };
  }

  localization() {
    DOM_ELEMENTS.inputBtn.textContent = I18n.translate(this.elements.inputBtnValue);
    DOM_ELEMENTS.searchInput.placeholder = I18n
      .translate(this.elements.inputPlaceholderValue);
  }

  updateBackgroundBtnListener() {
    DOM_ELEMENTS.btn.addEventListener('click', async () => {
      DOM_ELEMENTS.btn.children[0].classList.add('spin-animation');
      setTimeout(() => {
        DOM_ELEMENTS.btn.children[0].classList.remove('spin-animation');
      }, 900);
      const backgroundsModel = new BackgroundsModel(this.query);
      const randomBackgroundURL = await backgroundsModel.getRandomBackgroundURL(this.timezone);
      const appView = new AppView(randomBackgroundURL);
      appView.setRandomBackground();
    });
  }

  changeUnitsBtnListener() {
    if (this.units === 'imperial') {
      DOM_ELEMENTS.unitsButtons.forEach((el) => {
        el.classList.toggle('inactive');
      });
    }

    DOM_ELEMENTS.unitsBlock.addEventListener('click', (event) => {
      if (event.target.classList.contains('inactive')) {
        DOM_ELEMENTS.unitsButtons.forEach((el) => {
          el.classList.add('inactive');
        });
        event.target.classList.remove('inactive');
        if (this.onUnitChange !== null) {
          this.onUnitChange(event.target.getAttribute('data-value'));
        }
      }
    });
  }

  changeLangMenuListener() {
    DOM_ELEMENTS.faceBtn.addEventListener('click', () => {
      if (DOM_ELEMENTS.faceBtn.classList.contains('drop-down-menu__face-button_open')) {
        DOM_ELEMENTS.faceBtn.classList.remove('drop-down-menu__face-button_open');
        DOM_ELEMENTS.arrowDown.classList.remove('arrow-down_open');
        DOM_ELEMENTS.menu.classList.remove('drop-down-menu_open');
      } else {
        DOM_ELEMENTS.faceBtn.classList.add('drop-down-menu__face-button_open');
        DOM_ELEMENTS.arrowDown.classList.add('arrow-down_open');
        DOM_ELEMENTS.menu.classList.add('drop-down-menu_open');
      }
    });

    DOM_ELEMENTS.menu.addEventListener('click', (event) => {
      DOM_ELEMENTS.menuItems.forEach((el) => {
        el.classList.add('inactive');
      });
      event.target.classList.remove('inactive');

      if (event.target.getAttribute('data-value') !== I18n.lang) {
        DOM_ELEMENTS.faceBtn.firstElementChild.textContent = event.target.getAttribute('data-value');
        I18n.setLang(event.target.getAttribute('data-value'));
        if (this.onLangChange !== null) {
          this.onLangChange(event.target.getAttribute('data-value'));
        }
        this.localization();
        DOM_ELEMENTS.faceBtn.classList.remove('drop-down-menu__face-button_open');
        DOM_ELEMENTS.arrowDown.classList.remove('arrow-down_open');
        DOM_ELEMENTS.menu.classList.remove('drop-down-menu_open');
      }
    });

    DOM_ELEMENTS.menuItems.forEach((el) => {
      el.classList.add('inactive');
      if (el.getAttribute('data-value') === this.lang) {
        el.classList.remove('inactive');
        DOM_ELEMENTS.faceBtn.firstElementChild.textContent = this.lang;
      }
    });
  }

  searchBlockListener() {
    DOM_ELEMENTS.searchBtn.addEventListener('click', () => {
      DOM_ELEMENTS.searchInput.classList.remove('search-field-error');
      if (DOM_ELEMENTS.searchInput.value.length <= 1) {
        DOM_ELEMENTS.searchInput.blur();
        DOM_ELEMENTS.searchInput.value = '';
        DOM_ELEMENTS.searchInput.classList.add('search-field-error');
        DOM_ELEMENTS.searchInput.placeholder = I18n
          .translate(this.elements.inputPlaceholderError);
      } else {
        if (this.request !== null) {
          this.request(DOM_ELEMENTS.searchInput.value.toString());
        }
        DOM_ELEMENTS.searchInput.blur();
        DOM_ELEMENTS.searchInput.value = '';
        DOM_ELEMENTS.searchInput.placeholder = I18n
          .translate(this.elements.inputPlaceholderValue);
      }
    });

    DOM_ELEMENTS.searchInput.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        DOM_ELEMENTS.searchBtn.click();
      }
    });
  }

  voiceListener() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    DOM_ELEMENTS.voiceBtn.addEventListener('click', () => {
      recognition.start();
      DOM_ELEMENTS.voiceBtn.setAttribute('style', 'display: none;');
      DOM_ELEMENTS.searchBtn.classList.add('disabled');
      DOM_ELEMENTS.searchInput.placeholder = I18n
        .translate(this.elements.inputPlaceholderVoice);
    });

    recognition.addEventListener('end', () => {
      DOM_ELEMENTS.voiceBtn.setAttribute('style', 'display: block;');
      DOM_ELEMENTS.searchBtn.classList.remove('disabled');
      DOM_ELEMENTS.searchInput.placeholder = I18n
        .translate(this.elements.inputPlaceholderValue);
    });

    recognition.addEventListener('result', (e) => {
      const { transcript } = e.results[0][0];
      if (this.request !== null) {
        this.request(transcript);
      }
    });
  }

  showErrorMessage() {
    DOM_ELEMENTS.searchInput.classList.add('search-field-error');
    DOM_ELEMENTS.searchInput.placeholder = I18n.translate(this.elements.inputPlaceholderError);
  }
}
