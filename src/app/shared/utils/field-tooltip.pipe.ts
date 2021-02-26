import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fieldTooltip'
})
export class FieldTooltipPipe implements PipeTransform {

  transform(value: string): string {
    if (typeof(value) === 'undefined') {
      return;
    } else {
      const fieldsArr = ['duration', 'kills', 'deaths', 'assists', 'gold per min', 'xp per min', 'last hits', 'denies', 'hero damage', 'tower damage', 'hero healing'];
      const fieldsTooltipContent = ['The length of the match', 'Number of kills by hero', 'Number of deaths by hero', 'Number of assists by hero', 'Gold farmed per minute', 'Experience gained per minute', 'Number of last hits by hero', 'Number of denied creeps' , 'Amount of damage dealt to hereos' , 'Amount of damage dealt to towers', 'Amount of health restored to heroes'];
      // indexOf value of fieldsArr
      const index = fieldsArr.indexOf(value);
      return fieldsTooltipContent[index];
    }
  }

}
