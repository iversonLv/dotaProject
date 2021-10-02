import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordinalNum'
})
export class OrdinalNumPipe implements PipeTransform {

  transform(num: number): string {
    // check type of
    if (typeof(num) === 'undefined') {
      return;
    } else {
      // 11 to 13 is special with 'th'
      if (num % 100 >= 11 && num % 100 <= 13) {
        return num + 'th';
      } else {
        // if 1, 2, 3 will with special subfix with 'st', 'nd', 'rd' other will be 'th'
        if (num % 10 === 1) {
          return num + 'st';
        } else if (num % 10 === 2) {
          return num + 'nd';
        } else if (num % 10 === 3) {
          return num + 'rd';
        } else {
          return num + 'th';
        }
      }
    }

  }

}


// const getOrdinal = (n) => {
//   // TODO localize
//   const s = ['th', 'st', 'nd', 'rd'];
//   const v = n % 100;
//   return n + (s[(v - 20) % 10] || s[v] || s[0]);
// };
