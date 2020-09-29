import getDateTime from './getDateTime.helper';
import I18n from '../i18n/i18n.class';

describe('getDateTime', () => {
  it('Should be instance of Function', () => {
    expect(getDateTime).toBeInstanceOf(Function);
  });
  it('Should return GMT timezone by offset in seconds', () => {
    const timeOffset1 = -28800;
    const timeOffset2 = +36000;
    const result1 = getDateTime(timeOffset1);
    const result2 = getDateTime(timeOffset2);
    expect(result1).toEqual(expect.stringContaining('GMT-8'));
    expect(result2).toEqual(expect.stringContaining('GMT+10'));
  });
  it('Function should return current time if timeOffset argument is undefined', () => {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (hours <= 9) hours = `0${hours}`;
    if (minutes <= 9) minutes = `0${minutes}`;
    const result = getDateTime();
    expect(result).toEqual(expect.stringContaining(`${hours}:${minutes}`));
  });
  it('Function should return correct translated shrink day names', () => {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date();
    const dayName = date.getDay();
    I18n.lang = 'be';
    let shrinkDayName = I18n.translate(dayNames[dayName]);
    let result = getDateTime();
    expect(result).toEqual(expect.stringContaining(`${shrinkDayName}`));
    I18n.lang = 'ru';
    shrinkDayName = I18n.translate(dayNames[dayName]);
    result = getDateTime();
    expect(result).toEqual(expect.stringContaining(`${shrinkDayName}`));
    I18n.lang = 'en';
    shrinkDayName = I18n.translate(dayNames[dayName]);
    result = getDateTime();
    expect(result).toEqual(expect.stringContaining(`${shrinkDayName}`));
  });
});
