import I18n from '../i18n/i18n.class';

export default function getDateTime(timeOffset) {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const date = new Date();
  const currentTimeZone = -date.getTimezoneOffset() / 60;
  let timeZone = 0;
  let timeZoneOffset = 0;
  if (timeOffset) {
    timeZone = timeOffset / 3600;
    timeZoneOffset = timeZone - currentTimeZone;
  }
  const monthNum = date.getMonth();
  date.setHours(date.getHours() + timeZoneOffset);
  let day = date.getDate();
  const dayName = date.getDay();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let sec = date.getSeconds();
  const shrinkDayName = I18n.translate(dayNames[dayName]);
  const MonthName = I18n.translate(monthNames[monthNum]);
  if (day <= 9) day = `0${day}`;
  if (hours <= 9) hours = `0${hours}`;
  if (minutes <= 9) minutes = `0${minutes}`;
  if (sec <= 9) sec = `0${sec}`;
  const dateTime = `${shrinkDayName} ${day} ${MonthName}  (GMT${(timeZone > 0) ? `+${timeZone}` : timeZone}) ${hours}:${minutes}:${sec}`;
  return dateTime;
}
