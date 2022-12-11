import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameDestruct'
})
export class NameDestructPipe implements PipeTransform {

  transform(value: string, fromSeparator: string, fromSeparatorPlacement: number, upperCase?: string, toSeparator?: string): unknown {
    // example lobby_type name is lobby_type_normal, we need destruct only last string and uppercase
    if (value !== null && value.split(fromSeparator).length > 1) {
      if (upperCase === 'upperCase') {
        // tslint:disable-next-line:max-line-length
        return value.split(fromSeparator).splice(fromSeparatorPlacement).map(i => i.charAt(0).toUpperCase() + i.slice(1, i.length)).join(toSeparator ?? ' ');
      } else {
        return value.split(fromSeparator).splice(fromSeparatorPlacement).join(toSeparator ?? ' ');
      }
    } else {
      return value;
    }
  }

}
