import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excludeText'
})
export class ExcludeTextPipe implements PipeTransform {

  transform(arr: string[], args: string[]): string[] {
    for (const key in args) {
      if (arr.hasOwnProperty(key)) {
        arr = arr.filter(item => !item.includes(args[key]));
      }
    }
    return arr;
  }

}
