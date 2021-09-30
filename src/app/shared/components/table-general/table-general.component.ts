import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-general',
  templateUrl: './table-general.component.html',
  styleUrls: ['./table-general.component.scss']
})
export class TableGeneralComponent implements OnInit {
  @Input() data: any[];
  @Input() displayedColumns: string[];
  @Input() tooltips: string[];
  dataSource = new MatTableDataSource();

  // displayedColumns: string[] = ['percentile', 'GPM', 'XPM', 'KPM', 'LHM', 'HDM', 'HHM', 'TD', 'SPM', 'LH'];
  constructor() { }

  ngOnInit(): void {
    this.dataSource.data = this.data;
  }

}
