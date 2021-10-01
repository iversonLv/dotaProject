import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-table-general',
  templateUrl: './table-general.component.html',
  styleUrls: ['./table-general.component.scss']
})
export class TableGeneralComponent implements OnInit, AfterViewInit {
  @Input() data: any[];
  @Input() displayedColumns: string[];
  @Input() tooltips: string[] = [];
  @Input() sortHeader: [] = []; // [sortHeader]="[1, 0, true, false, '']",
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource();

  // displayedColumns: string[] = ['percentile', 'GPM', 'XPM', 'KPM', 'LHM', 'HDM', 'HHM', 'TD', 'SPM', 'LH'];
  constructor() {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.dataSource.data = this.data;
  }

}
