import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vision-map-single',
  templateUrl: './vision-map-single.component.html',
  styleUrls: ['./vision-map-single.component.scss']
})
export class VisionMapSingleComponent implements OnInit {
  @Input() data: any;

  // default map size 900, sen visible r is 40.9, obs visible r is 73.6
  @Input() mapSize = 550;

  // senObs icon size width is 18, height is 14
  senObsSize = [18, 13.88];
  senPadding = [];
  obsPadding = [];
  mapData;
  constructor() { }

  ngOnInit(): void {
    // -4 which is border
    this.senPadding = [this.mapSize * 45.9 / 900 - this.senObsSize[0] / 2 - 4, this.mapSize * 45.9 / 900 - this.senObsSize[1] / 2 - 4];
    this.obsPadding = [this.mapSize * 78.6 / 900 - this.senObsSize[0] / 2 - 4, this.mapSize * 78.6 / 900 - this.senObsSize[1] / 2 - 4];
    this.mapData = this.calObsSenData(this.data, this.mapSize);
  }

  calObsSenData(data: any, mapSize: number): any {
    return {
      ...data,
      mapPosition: [
        // 0 -> x -> horizantoal size for left right; 1 -> y -> virtical size for top bottom
        (Number(data.x) - 64) * mapSize / 128,
        (128 - (Number(data.y) - 64)) * mapSize / 128,
      ]
    };
  }

}
