import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToArray'
})
export class StringToArrayPipe implements PipeTransform {

  transform(value: any, agrs?: number): unknown {
    if (typeof(value) === 'string') {
      return value.split(',');
    }
    return value;
  }

}
