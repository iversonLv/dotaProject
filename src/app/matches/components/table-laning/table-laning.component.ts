import { Component, Input, OnInit, ViewChild } from '@angular/core';

// material
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// model
import { IheroLocal } from 'src/app/heros/model/heroLocal';

@Component({
  selector: 'app-table-laning',
  templateUrl: './table-laning.component.html',
  styleUrls: ['./table-laning.component.scss']
})
export class TableLaningComponent implements OnInit {
  @Input() data: any;
  @Input() playerColorLocal: any;
  @Input() heroes: IheroLocal;
  @Input() laneRoleLocal: any;

  @ViewChild(MatSort) set matSort(mp: MatSort) {
    this.sort = mp;
    this.setDataSourceAttributes();
  }

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'selected',
    'player_slot',
    'isRadiant',
    'lane_role',
    'cs',
    'eff',
    'lh',
    'dn'
  ];
  sort;
  finalData = [];
  constructor() { }

  ngOnInit(): void {
    // extract the data
    this.dataSource.data = this.extractData(this.data);
  }

  extractData(data): any[] {
    data.forEach(z => {
      const { hero_id, player_slot, pred_vict, account_id, rank_tier, name, personaname,
        isRadiant, is_roaming, lane_role, lh_t, dn_t, lane_efficiency
      } = z;

      this.finalData.push({
        hero_id,
        pred_vict,
        player_slot,
        account_id,
        rank_tier,
        name,
        personaname,
        // above is common data for player
        isRadiant,
        is_roaming,
        lane_role,
        lh: this.getSpecificTimeData(lh_t, 10),
        dn: this.getSpecificTimeData(dn_t, 10),
        lane_efficiency,
        lhdn_t: this.extractDnLHT(z)
      });

    });
    console.log(this.finalData);
    return this.finalData;
  }

  // set table sort
  setDataSourceAttributes(): any {
    this.dataSource.sort = this.sort;
  }

  // get Specificic time data
  // current we need get 10minute lh, dn
  getSpecificTimeData(field: string, specificeTime: number): any {
    // specificeTime is base on the array index, so beginning from 0
    // So we need compare the array length and specifice time
    const dataLength = field.length;
    dataLength < specificeTime + 1 ? specificeTime = dataLength - 1 : specificeTime = specificeTime;

    const specifictTimeData = field[specificeTime];
    return +specifictTimeData === 0 ? '-' : +specifictTimeData;
  }

  // cal perfect data for field
  calPerfectData(data: any, field: string): number {
    const arr = [];
    data.filter(i => i[field] !== '-').forEach(i => {
      arr.push(i[field]);
    });

    return Math.max(...arr);
  }

  // extract dn_t and lh_t together
  extractDnLHT(data: any): number[] {
    data = (data.lh_t || []).map((i, index) =>  i + ((data.dn_t || [])[index] || 0));
    console.log(data);
    return data;
  }

}
