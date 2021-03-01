import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

// material
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

// ngrx
import { Store } from '@ngrx/store';
import * as searchActions from '../../store/search.actions';
import * as playersActions from 'src/app/players/store/players.actions';

// model
import { ISearchData } from '../../model/search';
import { IProData } from 'src/app/players/model/pro';

@Component({
  selector: 'app-table-result',
  templateUrl: './table-result.component.html',
  styleUrls: ['./table-result.component.scss']
})
export class TableResultComponent implements OnInit {
  @Input() isPage;
  @Input() displayedColumns: string[] = ['name'];
  dataSource = new MatTableDataSource();
  searchQuery;
  isLoading = true;

  // material table bottom paginator
  // officaly, material table only support one paginator
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  paginator;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<{ searchList: ISearchData, proPlayers: IProData }>
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(data => this.searchQuery = data);

    if (this.isPage === 'proplayers') {
      this.store.dispatch(new playersActions.LoadProPlayers());
      this.store.select('proPlayers').subscribe(data => {
        const searchTerm = this.searchQuery.params.q.toLowerCase().trim();
        this.isLoading = data.isLoading;
        if (!data.isLoading) {
          let proPlayersData = [...data.pros];
          proPlayersData = proPlayersData.filter(i => i.name.toLowerCase().trim().indexOf(searchTerm) > -1);
          this.isLoading = data.isLoading;
          return this.dataSource.data = proPlayersData;
        }
      }, err => {
        console.log(err);
      });
    } else if (this.isPage === 'publicplayers') {
      if (this.searchQuery.params.q !== '') {
        this.store.dispatch(new searchActions.LoadSearch(this.searchQuery));
        this.store.select('searchList').subscribe(data => {
          this.isLoading = data.isLoading;
          if (!data.isLoading) {
            const resultsData = [...data.results];
            this.isLoading = data.isLoading;
            return this.dataSource.data = resultsData;
          }
        }, err => {
          console.log(err);
        });
      } else {
        this.isLoading = false;
        this.dataSource.data = [];
      }
    }

  }

  setDataSourceAttributes(): any {
    this.dataSource.paginator = this.paginator;
  }

  // material table bottom paginator
  syncPrimaryPaginator(event: PageEvent): any {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    this.paginator.page.emit(event);
  }

  calDate(date: string): number {
    return Date.parse(date);
  }

}
