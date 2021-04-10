import { Component, Input, OnInit } from '@angular/core';
import { IheroLocal } from 'src/app/heros/model/heroLocal';

@Component({
  selector: 'app-obs-sen-modal',
  templateUrl: './obs-sen-modal.component.html',
  styleUrls: ['./obs-sen-modal.component.scss']
})
export class ObsSenModalComponent implements OnInit {
  @Input() heroesLocal: IheroLocal;
  @Input() player: any;
  @Input() playerColorLocal: any;

  @Input() pageXY: number[] = [0, 100];
  @Input() data: any = {
    attackername: 'npc_dota_observer_wards',
    ehandle: 12353772,
    entityleft: true,
    key: '[86, 144]',
    left_time: '13:11',
    lifespan: '6:00',
    mapPosition: [94.53125, 206.25],
    placed_time: '7:11',
    player_slot: 1,
    slot: 1,
    time: 431,
    type: 'obs_log',
    x: 86,
    y: 144,
    z: 130,
  };


  constructor() { }

  ngOnInit(): void {
  }

}
