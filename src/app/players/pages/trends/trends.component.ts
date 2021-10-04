import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// ngrx
import { Store } from '@ngrx/store';
import * as playersActions from '../../store/players.actions';

// model
import { ITrend, ITrendData } from '../../model/trend';
import { IheroLocal } from 'src/app/heros/model/heroLocal';

// service
import { PlayersService } from '../../services/players.service';

// dotaconstants
import heroes from 'dotaconstants/build/heroes.json';
import gameMode from 'dotaconstants/build/game_mode.json';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss']
})
export class TrendsComponent implements OnInit {
  currentSelectedField = 'Kills';
  queryParams;
  accountId;
  field = 'kills';
  fieldDescription = '';

  isLoading = false;
  trends: ITrend[] = [];
  fieldsLocal;

  // User for hero modal to mapping
  heroes: any = heroes;
  gameMode: any = gameMode;
  constructor(
    private router: Router,
    private playersService: PlayersService,
    private activatedRoute: ActivatedRoute,
    private store: Store<{ playersTrends: ITrendData }>
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(data => this.queryParams = data);
    this.accountId = this.router.url.split('/')[2];
    // here is click nav bar 'histogram', there won't be kills, so forece it to kills by default if undefined
    this.field = this.router.url.split('/')[4] === undefined ? 'kills' : this.router.url.split('/')[4].split('?')[0];

    this.store.dispatch(new playersActions.LoadPlayersTrends(this.accountId, this.field, this.queryParams));

    this.store.select('playersTrends').subscribe(data => {
      this.isLoading = data.isLoading;
      if (!data.isLoading) {
        const historgramsData = [...data.trends];
        this.isLoading = data.isLoading;
        // console.log(historgramsData.filter(i => i[this.field] !== null).reverse())
        return this.trends = historgramsData.filter(i => i[this.field] !== null).reverse();
      }
    }, err => {
      console.log(err);
    });
    this.getFieldsLocal();

  }

  getFieldsLocal(): any {
    this.playersService.getFields().subscribe(data => {
      let grabDataValuesAsArry = [{
        name: '',
        description: '',
        id: ''
      }];
      grabDataValuesAsArry = Object.values(data);
      const descriptionMatchedArr = grabDataValuesAsArry.filter(i => i.name.slice(11) === this.field);
      this.fieldDescription = descriptionMatchedArr[0].description;
      return this.fieldsLocal = data;
    }, err => {
      console.log(err);
    });
  }

  // set Hero id to update players win lose data
  async setQueryParams(value): Promise<void> {
    this.field = this.fieldsLocal[value].name.slice(11);
    this.fieldDescription = this.fieldsLocal[value].description;
    // update url
    await this.router.navigate([`${this.field}`], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge',
    });
    // dispatch the historgrams
    this.store.dispatch(new playersActions.LoadPlayersTrends(this.accountId, this.field, this.queryParams));
  }

  // when update the url, the dropdown value should update
  setDropdownDefaultValue(): any {
    this.field === undefined ? this.field = 'kills' : this.field = this.field;
    return this.field.split('_').map(i => i.charAt(0).toUpperCase() + i.slice(1, i.length)).join(' ');
  }
}
