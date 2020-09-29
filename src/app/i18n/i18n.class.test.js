import I18n from './i18n.class';

describe('I18n', () => {
  it('Lang property of I18n class should be defined', () => {
    expect(I18n.lang).toBeDefined();
  });
  it('Should return translated values to english', () => {
    I18n.lang = 'en';
    const value1 = 'Search';
    const value2 = 'Lat';
    const value3 = 'Sun';
    expect(I18n.translate(value1)).toBe('Search');
    expect(I18n.translate(value2)).toBe('Latitude');
    expect(I18n.translate(value3)).toBe('Sun');
  });
  it('Should return translated values to russian', () => {
    I18n.lang = 'ru';
    const value1 = 'Search';
    const value2 = 'Lat';
    const value3 = 'Sun';
    expect(I18n.translate(value1)).toBe('Поиск');
    expect(I18n.translate(value2)).toBe('Широта');
    expect(I18n.translate(value3)).toBe('Вс');
  });
  it('Should return translated values to belorussian', () => {
    I18n.lang = 'be';
    const value1 = 'Search';
    const value2 = 'Lat';
    const value3 = 'Sun';
    expect(I18n.translate(value1)).toBe('Пошук');
    expect(I18n.translate(value2)).toBe('Шырата');
    expect(I18n.translate(value3)).toBe('Нд');
  });
  it('Should set lang property', () => {
    let lang = 'be';
    I18n.setLang(lang);
    expect(I18n.lang).toBe(lang);
    lang = 'ru';
    I18n.setLang(lang);
    expect(I18n.lang).toBe(lang);
    lang = 'en';
    I18n.setLang(lang);
    expect(I18n.lang).toBe(lang);
  });
});
