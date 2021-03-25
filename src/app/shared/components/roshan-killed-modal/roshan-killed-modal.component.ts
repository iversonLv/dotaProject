import { Component, Input, OnInit } from '@angular/core';

// model
import { IheroLocal } from 'src/app/heros/model/heroLocal';

@Component({
  selector: 'app-roshan-killed-modal',
  templateUrl: './roshan-killed-modal.component.html',
  styleUrls: ['./roshan-killed-modal.component.scss']
})
export class RoshanKilledModalComponent implements OnInit {
  @Input() pageXY: number[];
  @Input() data: any;
  @Input() heroesLocal: IheroLocal;
  @Input() playerColorLocal: any;
  constructor() { }

  ngOnInit(): void {
  }

}
