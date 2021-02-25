import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameDestruct'
})
export class NameDestructPipe implements PipeTransform {

  transform(value: string, separator: string, separatorPlacement: number): unknown {
    // example lobby_type name is lobby_type_normal, we need destruct only last string and uppercase
    if (value !== null && value.split(separator).length > 1) {
      return value.split(separator).splice(separatorPlacement).join(' ');
    } else {
      return value;
    }
  }

}
