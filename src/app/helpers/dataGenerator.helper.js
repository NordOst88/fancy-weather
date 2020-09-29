import getDateTime from './getDateTime.helper';
import I18n from '../i18n/i18n.class';

export default function dataGenerator(obj1, obj2) {
  const obj = Object.assign(obj1, obj2);
  obj.dateTime = getDateTime(obj.timeZone);
  obj.lang = I18n.lang;
  return obj;
}
