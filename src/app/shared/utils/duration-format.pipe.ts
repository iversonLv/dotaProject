import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationFormat'
})
export class DurationFormatPipe implements PipeTransform {

  transform(duration: number): unknown {
    let minus = false;
    duration < 0 ? minus = true : minus = false;
    const getMin = (Math.abs(Math.floor(duration) / 60)).toString().split('.')[0];
    let getSec = Math.abs(Math.floor(duration)) % 60 === 0 ? '00' : Math.abs(Math.floor(duration)) % 60;
    if (getSec < 10 && getSec > 0) {
      getSec = '0' + getSec + '';
    }
    return minus ? `-${getMin}:${getSec}` : `${getMin}:${getSec}`;
  }

}
