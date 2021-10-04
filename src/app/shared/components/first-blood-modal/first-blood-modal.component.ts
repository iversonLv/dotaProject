import { Component, Input, OnInit } from '@angular/core';

// model
import { IheroLocal } from 'src/app/heros/model/heroLocal';

@Component({
  selector: 'app-first-blood-modal',
  templateUrl: './first-blood-modal.component.html',
  styleUrls: ['./first-blood-modal.component.scss']
})
export class FirstBloodModalComponent implements OnInit {
  @Input() pageXY: number[];
  @Input() data: any;
  @Input() heroes: IheroLocal;
  @Input() playerColorLocal: any;
  constructor() { }

  ngOnInit(): void {
  }

}
