import { Component, Input, OnInit } from '@angular/core';
import { IFacte } from '../../heros/model/facte';

@Component({
  selector: 'app-factes-modal',
  templateUrl: './factes-modal.component.html',
  styleUrls: ['./factes-modal.component.scss'],
})
export class FactesModalComponent implements OnInit {
  @Input() pageXY: number[];
  @Input() facet: IFacte;
  constructor() {}

  ngOnInit(): void {}
}
