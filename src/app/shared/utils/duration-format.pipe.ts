import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationFormat'
})
export class DurationFormatPipe implements PipeTransform {

  transform(duration: number): unknown {
    const getMin = (duration / 60).toString().split('.')[0];
    let getSec = duration % 60 === 0 ? '00' : duration % 60;
    if (getSec < 10) {
      getSec = '0' + getSec + '';
    }
    return `${getMin}:${getSec}`;
  }

}
