import { Component, Input, OnInit } from '@angular/core';

// model
import { ICosmetic } from 'src/app/shared/model/cosmetic';

@Component({
  selector: 'app-cosmetic-modal',
  templateUrl: './cosmetic-modal.component.html',
  styleUrls: ['./cosmetic-modal.component.scss']
})
export class CosmeticModalComponent implements OnInit {
  @Input() cosmetic: ICosmetic;
  @Input() pageXY: number[];

  constructor() { }

  ngOnInit(): void {
  }

}
