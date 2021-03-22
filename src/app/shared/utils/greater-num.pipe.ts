import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'greaterNum'
})
export class GreaterNumPipe implements PipeTransform {

  transform(num: number, gN: number, unit: string): unknown {
    let minus = '';
    if (num < 0) {
      minus = '-';
    }
    num = Math.abs(num);
    if (num > gN) {
      const newNum = (num / gN).toFixed(1);
      return `${minus}${newNum}${unit}`;
    } else {
      return `${minus}${num}`;
    }
  }

}
