import { Component, Input, OnInit } from '@angular/core';

// model
import { IheroLocal } from 'src/app/heros/model/heroLocal';

@Component({
  selector: 'app-time-line-teamfight',
  templateUrl: './time-line-teamfight.component.html',
  styleUrls: ['./time-line-teamfight.component.scss']
})
export class TimeLineTeamfightComponent implements OnInit {
  @Input() data: any;
  @Input() playerColorLocal: any;
  @Input() heroesLocal: IheroLocal;
  @Input() heroesNameLocal: any;

  pageXY = [];

  // first bolld modal
  firstBloodModalData = null;
  showFirstBloodModal = false;

  // team fight modal
  currentTeamFightData = null;
  showTeamFightModal = false;

  // roshanAegis modal
  currentRoshanAegisData = null;
  showRoshanAegisModal = false;

  firstBloodData = {
    time: null,
    drewPlayer: null,
    takenPlayer: null,
  };
  roshanAegisData = [];
  constructor() { }

  ngOnInit(): void {
    this.calFirstBlood(this.data.objectives, this.data.players);
    this.calRoshanKillAegisData(this.data.objectives, this.data.players);
  }

  // extract first blood data
  calFirstBlood(objectives: any, players: any): any {
    objectives.forEach(i => {
      if (i.type === 'CHAT_MESSAGE_FIRSTBLOOD') {
        this.firstBloodData.time =  i.time;
        this.firstBloodData.drewPlayer = players[i.slot];
        this.firstBloodData.takenPlayer = players[i.key];
      }
    });
    return this.firstBloodData;
  }

  calRoshanKillAegisData(objectives: any, players: any): any[] {
    const aegisPickedArr = objectives.filter(i => i.type === 'CHAT_MESSAGE_AEGIS');
    aegisPickedArr.forEach(i => {
      this.roshanAegisData.push({
        killedTime: i.time,
        pickedAegisPlayer: players[i.slot]
      });
    });
    return this.roshanAegisData;
  }

  // cal teamfight win side
calTeamFightIsRadiantWin(teamfight: any): boolean {
  // calculate total gold dealta of radiant
  const radiantDealta = teamfight.players.slice(0, 5).map(i => i.gold_delta).reduce((cur, total) => cur + total, 0);
  // calculate total gold dealta of dire
  const direDealta = teamfight.players.slice(5, 10).map(i => i.gold_delta).reduce((cur, total) => cur + total, 0);

  // if total gold dealta of radiant is greater than dire's, then RADIANT team fight win
  if (radiantDealta > direDealta) {
    return true;
  } else {
    return false;
  }
  }


  // show first blood modal
  showFirstBloodModalFn(e, data): any {
    this.pageXY = [e.pageX, e.pageY - 80];
    this.showFirstBloodModal = true;
    this.firstBloodModalData = data;
  }

  // show team-fight-modal
  showTeamFightModalFn(e, data): any {
    this.pageXY = [e.pageX, e.pageY - 80];
    this.showTeamFightModal = true;
    this.currentTeamFightData = data;
  }

  // kill roshan aegise modal
  showRoshanAegisModalFn(e, data): any {
    this.pageXY = [e.pageX, e.pageY - 80];
    this.showRoshanAegisModal = true;
    this.currentRoshanAegisData = data;
  }
}
