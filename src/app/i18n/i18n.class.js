import VALUES_RU from './ru';
import VALUES_BE from './be';
import VALUES_EN from './en';
import GLOBAL from '../constants/global';

class I18n {
  constructor() {
    this.lang = localStorage.getItem('lang') || GLOBAL.DEFAULT_LANG;
  }

  setLang(lang) {
    localStorage.setItem('lang', lang);
    this.lang = lang;
  }

  translate(key) {
    const dict = {
      en: VALUES_EN,
      ru: VALUES_RU,
      be: VALUES_BE,
    };
    return dict[this.lang][key] || VALUES_EN[key] || key;
  }
}

export default new I18n();
