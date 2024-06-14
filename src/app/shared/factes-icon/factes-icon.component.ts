import { Component, OnInit, Input } from '@angular/core';
import { IFacte } from '../../heros/model/facte';

@Component({
  selector: 'app-factes-icon',
  templateUrl: './factes-icon.component.html',
  styleUrls: ['./factes-icon.component.scss'],
})
export class FactesIconComponent implements OnInit {
  @Input() facet: IFacte;

  constructor() {}

  ngOnInit(): void {}
}
