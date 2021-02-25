import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'greaterNum'
})
export class GreaterNumPipe implements PipeTransform {

  transform(num: number, gN: number, unit: string): unknown {
    if (num > gN) {
      const newNum = (num / gN).toFixed(1);
      return `${newNum}${unit}`;
    } else {
      return num;
    }
  }

}
