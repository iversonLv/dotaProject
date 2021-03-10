import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameDestruct'
})
export class NameDestructPipe implements PipeTransform {

  transform(value: string, separator: string, separatorPlacement: number, upperCase?: string): unknown {
    // example lobby_type name is lobby_type_normal, we need destruct only last string and uppercase
    if (value !== null && value.split(separator).length > 1) {
      if (upperCase === 'upperCase') {
        return value.split(separator).splice(separatorPlacement).map(i => i.charAt(0).toUpperCase() + i.slice(1, i.length)).join(' ');
      } else {
        return value.split(separator).splice(separatorPlacement).join(' ');
      }
    } else {
      return value;
    }
  }

}
