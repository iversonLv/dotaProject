import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-public-col',
  templateUrl: './table-public-col.component.html',
  styleUrls: ['./table-public-col.component.scss']
})
export class TablePublicColComponent implements OnInit {
  @Input() dataP;
  @Input() dataW;
  @Input() num;
  constructor() { }

  ngOnInit(): void {
  }

}
