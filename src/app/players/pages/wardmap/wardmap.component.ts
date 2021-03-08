import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wardmap',
  templateUrl: './wardmap.component.html',
  styleUrls: ['./wardmap.component.scss']
})
export class WardmapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // if map is 900*900, data should be *7
  // if map is 579*579, data should be *4.5

  /*
   * Unpacks position data from hash format to array format
   * 64 is the offset of x and y values
   * subtracting y from 127 inverts from bottom/left origin to top/left origin
  **/
 /**
  * input example:
  * {
  *   "140": {
  *       "152": 1
  *   },
  * }
  * output example:
  * [{
  *   value: 1
  *   x: 534.375
  *   y: 281.25
  * }]
  */
 // use this format https://github.com/odota/web/blob/d94cc9693ad866a1d833876623de839e01b49531/src/utility/index.jsx#L311
  unpackPositionData(input, mapSize): any[] {
  if (typeof input === 'object' && !Array.isArray(input)) {
    const result = [];

    Object.keys(input).forEach((x) => {
      Object.keys(input[x]).forEach((y) => {
        result.push({
          x: (Number(x) - 64) * mapSize / 128,
          y: (128 - (Number(y) - 64)) * mapSize / 128,
          value: input[x][y],
        });
      });
    });

    return result;
  }

  return input;
}
}
