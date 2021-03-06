import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// ngrx
import { Store } from '@ngrx/store';
import * as playersActions from '../../store/players.actions';

// model
import { IHistogram, IHistogramData } from '../../model/histogram';
import { PlayersService } from '../../services/players.service';


@Component({
  selector: 'app-histograms',
  templateUrl: './histograms.component.html',
  styleUrls: ['./histograms.component.scss']
})
export class HistogramsComponent implements OnInit {
  currentSelectedField = 'Kills';
  queryParams;
  accountId;
  field = 'kills';
  fieldDescription = '';

  isLoading = false;
  totalMatches = 0;
  histogramMedian = 0;
  histograms: IHistogram[] = [];


  fieldsLocal;
  constructor(
    private router: Router,
    private playersService: PlayersService,
    private activatedRoute: ActivatedRoute,
    private store: Store<{ playersHistograms: IHistogramData}>
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(data => this.queryParams = data);
    this.accountId = this.router.url.split('/')[2];
    // here is click nav bar 'histogram', there won't be kills, so forece it to kills by default if undefined
    this.field = this.router.url.split('/')[4] === undefined ? 'kills' : this.router.url.split('/')[4].split('?')[0];

    this.store.dispatch(new playersActions.LoadPlayersHistograms(this.accountId, this.field, this.queryParams));

    this.store.select('playersHistograms').subscribe(data => {
      this.isLoading = data.isLoading;
      if (!data.isLoading) {
        const historgramsData = [...data.histograms];
        this.totalMatches = historgramsData.map(i => i.games).reduce((cur, total) => cur + total, 0);
        this.isLoading = data.isLoading;
        this.calMedian(historgramsData);
        return this.histograms = historgramsData;
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
    this.store.dispatch(new playersActions.LoadPlayersHistograms(this.accountId, this.field, this.queryParams));
  }

  // when update the url, the dropdown value should update
  setDropdownDefaultValue(): any {
    this.field === undefined ? this.field = 'kills' : this.field = this.field;
    return this.field.split('_').map(i => i.charAt(0).toUpperCase() + i.slice(1, i.length)).join(' ');
  }

  // calculate median
  calMedian(d: IHistogram[]): any {
    const half = Array.from(d).map(i => i.games).reduce((cur: number, total: number) => cur + total, 0) / 2;
    let totalGames = 0;
    for (const item of d) {
      totalGames = totalGames + item.games;
      if (totalGames > half) {
        return this.histogramMedian = item.x;
      }
    }
  }
}
