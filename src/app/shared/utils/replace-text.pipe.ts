import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceText'
})
export class ReplaceTextPipe implements PipeTransform {

  transform(value: string, replaceFrom, replaceTo): unknown {
    return value.replace(replaceFrom, replaceTo);
  }

}
