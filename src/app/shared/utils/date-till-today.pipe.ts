import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTillToday'
})
export class DateTillTodayPipe implements PipeTransform {

  transform(date: number): unknown {
    const today = (new Date()).toString();
    const todayParse = Date.parse(today);

    const lastPlayedTillToday = todayParse - date;

    const tillYears = lastPlayedTillToday / 1000 / 60  / 60 / 24 / 30 / 12;
    const tillMonths = lastPlayedTillToday / 1000 / 60  / 60 / 24 / 30;
    const tillDays = lastPlayedTillToday / 1000 / 60  / 60 / 24;
    const tillHours = lastPlayedTillToday / 1000 / 60  / 60;
    const tillMinutes = lastPlayedTillToday / 1000 / 60;

    if (date === 0 ) {
      return null;
    }
    if (tillYears >= 1 ) {
      if (Math.floor(tillYears) > 1) {
        return `${Math.floor(tillYears)} years ago`;
      } else {
        return 'a year ago';
      }
    } else if (tillMonths >= 1 ){
      if (Math.floor(tillMonths) > 1) {
        return `${Math.floor(tillMonths)} months ago`;
      } else {
        return 'a month ago';
      }
    } else if (tillDays >= 1) {
      if (Math.floor(tillDays) > 1) {
        return `${Math.floor(tillDays)} days ago`;
      } else {
        return 'a day ago';
      }
    } else if (tillHours >= 1) {
      if (Math.floor(tillHours) > 1) {
        return `${Math.floor(tillHours)} hours ago`;
      } else {
        return 'an hour ago';
      }
    } else if (tillMinutes  >= 1) {
      if (Math.floor(tillMinutes) > 1) {
        return `${Math.floor(tillMinutes)} minutes ago`;
      } else {
        return 'a minute ago';
      }
    }
    return null;
  }

}
