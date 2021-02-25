import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-benchmarks',
  templateUrl: './table-benchmarks.component.html',
  styleUrls: ['./table-benchmarks.component.scss']
})
export class TableBenchmarksComponent implements OnInit {
  @Input() data: any[];
  dataSource = new MatTableDataSource();

  displayedColumns: string[] = ['percentile', 'GPM', 'XPM', 'KPM', 'LHM', 'HDM', 'HHM', 'TD', 'SPM', 'LH'];
  constructor() { }

  ngOnInit(): void {
    this.dataSource.data = this.data;
  }

}
