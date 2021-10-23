import { Component, Input, OnInit, OnChanges } from '@angular/core';

// model
import { IheroLocal } from 'src/app/heros/model/heroLocal';
import { IObsSenLeftLog, IObsSenLog } from '../../model/match';

// pipe
import { DurationFormatPipe } from 'src/app/shared/utils/duration-format.pipe';

@Component({
  selector: 'app-vision-map',
  templateUrl: './vision-map.component.html',
  styleUrls: ['./vision-map.component.scss'],
  providers: [DurationFormatPipe]
})
export class VisionMapComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() showHideVisionPlayersData: any;
  @Input() playerColors: any;
  @Input() heroNames: IheroLocal;
  @Input() heroes: IheroLocal;
  @Input() visionTimeLine: number;


  // obsSen modal
  currentObsSen = null;
  pageXY = [];
  showObsSenModal = false;

  mapData;
  @Input() mapSize = 550; // default map size 900, sen visible r is 40.9, obs visible r is 73.6
  senPadding = [];
  obsPadding = [];
  // senObs icon size width is 18, height is 14
  senObsSize = [18, 13.88];

  constructor(
    private durationFormat: DurationFormatPipe
  ) { }

  ngOnInit(): void {
    // -4 which is border
    this.senPadding = [this.mapSize * 45.9 / 900 - this.senObsSize[0] / 2 - 4, this.mapSize * 45.9 / 900 - this.senObsSize[1] / 2 - 4];
    this.obsPadding = [this.mapSize * 78.6 / 900 - this.senObsSize[0] / 2 - 4, this.mapSize * 78.6 / 900 - this.senObsSize[1] / 2 - 4];
   // this.mapData = this.filterShowHideVisionDataFn(this.showHideVisionPlayersData, this.extractObsSenFinalData(this.data));

  }

  ngOnChanges(): void {
    this.mapData = this.filterShowHideVisionDataFn(this.showHideVisionPlayersData, this.extractObsSenFinalData(this.data));
  }


extractObsSenFinalData(data: any[]): any[] {
  const arr = [];
  data.forEach(i => {
    const obsData = this.calObsSenData(data[0].duration, i.obs_left_log, i.obs_log, this.mapSize);
    const senData = this.calObsSenData(data[0].duration, i.sen_left_log, i.sen_log, this.mapSize);
    arr.push(
      ...obsData,
      ...senData
    );
  });
  console.log('default', arr);
  return arr;
}


  calData(left): any {
  const a = {};
  left.forEach((item) => {
  // some key is the same so we need more data to distinguish them
    a[item.key + item.ehandle] = { ...item };
  });
  return {...a};
  }

  calObsSenData(duration: number, left: IObsSenLeftLog[], place: IObsSenLog[], mapSize: number): any[] {
  const arr = [];
  const leftData = this.calData(left);
  const placeData = this.calData(place);
  const placeDataKey = Object.keys(placeData);
  placeDataKey.forEach(i => {
    const d = {
      type: place[0].type,
      placed_time: this.durationFormat.transform(placeData[i].time),
      time: placeData[i].time,
      mapPosition: [
        // 0 -> x -> horizantoal size for left right; 1 -> y -> virtical size for top bottom
        (Number(placeData[i].x) - 64) * mapSize / 128,
        (128 - (Number(placeData[i].y) - 64)) * mapSize / 128,
      ]
    };
    if (leftData[i]) {
      arr.push({
        ...leftData[i],
        ...d,
        lifespan: this.durationFormat.transform(leftData[i].time - placeData[i].time),
        left_time: this.durationFormat.transform(leftData[i].time),
        left_time_num: leftData[i].time
      });
    } else {
      arr.push({
        ...placeData[i],
        ...d,
        lifespan: this.durationFormat.transform(duration - placeData[i].time),
        left_time: this.durationFormat.transform(duration),
        left_time_num: duration
      });
    }
  });
  return arr;
  // return duration(arr.reduce((cur, total) => cur + total, 0) / place.length)
  }

  // obsSen modal
  // show/hide talent modal
  showObsSenModalFn(e, obsSen): any {
    this.pageXY = [e.pageX - 100, e.pageY - 100];
    this.showObsSenModal = true;
    this.currentObsSen = obsSen;
  }

  filterShowHideVisionDataFn(players: any, data: any[]): any[] {
    // console.log(players, data)
    const arr = [];
    for (const i in players) {
      if (players.hasOwnProperty(i)) {
        arr.push(...data.filter(x => {
            const visionShowHideTimeline = this.visionTimeLine === -90
            ? true
            : (x.time <= this.visionTimeLine && x.left_time_num >= this.visionTimeLine);

            // if the wards time and left time cover the vision timeline show it.
            if (players[i].obs_log && players[i].sen_log) {
              return x.player_slot === players[i].player_slot && (x.type === 'obs_log' || x.type === 'sen_log') && visionShowHideTimeline;
            } else if (!players[i].obs_log && players[i].sen_log) {
              return x.player_slot === players[i].player_slot && (x.type !== 'obs_log' && x.type === 'sen_log') && visionShowHideTimeline;
            } else if (players[i].obs_log && !players[i].sen_log) {
              return x.player_slot === players[i].player_slot && (x.type === 'obs_log' && x.type !== 'sen_log') && visionShowHideTimeline;
            } else {
              return x.player_slot === players[i].player_slot && (x.type !== 'obs_log' && x.type !== 'sen_log') && visionShowHideTimeline;
            }
          })
        );
      }
    }
    console.log('filter', arr);
    return arr;
  }

}
