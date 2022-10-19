import { Component, OnInit } from '@angular/core';

// material
import { MatTableDataSource } from '@angular/material/table';

// ngrx
import * as herosActions from '../../store/heros.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

// dotaconstants
import itemIds from 'dotaconstants/build/item_ids.json';
import itemColors from 'dotaconstants/build/item_colors.json';
import items from 'dotaconstants/build/items.json';
import { IItemColorLocal } from 'src/app/shared/model/item_color';

@Component({
  selector: 'app-table-items',
  templateUrl: './table-items.component.html',
  styleUrls: ['./table-items.component.scss']
})
export class TableItemsComponent implements OnInit {
  // mat table
  displayedColumns: string[] = [
    'start_game_items',
    'early_game_items',
    'mid_game_items',
    'late_game_items'
  ];
  dataSource = new MatTableDataSource();

  // item modal default hidden
  showItemModal = false;
  currentMouseOverItem: any = null;
  pageXY = [];

  itemIds: any = itemIds;
  items: any = items;
  itemColors: IItemColorLocal = itemColors;

  finalData: any = {};

  isLoading = true;
  constructor(
    private router: Router,
    private store: Store<{ herosItemPopularity: any }>
  ) { }

  ngOnInit(): void {
    const currentUrl = this.router.url;
    const heroId = +currentUrl.split('/')[2];

    // load heros item popularity
    this.store.dispatch(new herosActions.LoadHerosItemPopularity(heroId));
    this.store.select('herosItemPopularity').subscribe(data => {
      this.isLoading = data.isLoading;
      if (!data.isLoading) {
        const dataHeroesItemPopularity = {...data.itemPopularity};
        Object.values(dataHeroesItemPopularity).forEach((stageObj, i) => {
          const a = [];
          a.push(Object.keys(stageObj));
          this.finalData[Object.keys(dataHeroesItemPopularity)[i]] = a;
        });
        this.isLoading = data.isLoading;
        return this.dataSource.data = [this.finalData];
      }
    }, err => {
      console.log(err);
    });
  }

  showItemModalFn(e, id, column): any {
    if (column === 'start_game_items') {
      this.pageXY = [e.pageX + 45, e.pageY - 220];
    } else {
      this.pageXY = [e.pageX - 350, e.pageY - 220];
    }
    this.showItemModal = true;
    this.currentMouseOverItem = this.items[this.itemIds[id]];
  }

}
