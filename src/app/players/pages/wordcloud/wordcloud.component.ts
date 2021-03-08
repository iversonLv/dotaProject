import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// ngrx
import { Store } from '@ngrx/store';
import * as playersAction from '../../store/players.actions';

@Component({
  selector: 'app-wordcloud',
  templateUrl: './wordcloud.component.html',
  styleUrls: ['./wordcloud.component.scss']
})
export class WordcloudComponent implements OnInit {
  accountId;
  isLoading: false;
  queryParams;
  wordClouds: any = {
    my_word_counts: [],
    all_word_counts: []
  };
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<{ playersWordClouds: any }>
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(data => this.queryParams = data);
    this.accountId = this.router.url.split('/')[2];

    this.store.dispatch(new playersAction.LoadPlayersWordClouds(this.accountId, this.queryParams));
    this.store.select('playersWordClouds').subscribe(data => {
      this.isLoading = data.isLoading;
      if (!data.isLoading) {
        const wordCloudsData = {...data.wordClouds};
        this.wordClouds.my_word_counts = this.calSeriesData(wordCloudsData.my_word_counts);
        this.wordClouds.all_word_counts = this.calSeriesData(wordCloudsData.all_word_counts);
        this.isLoading = data.isLoading;

        return this.wordClouds;
      }
    }, err => {
      console.log(err);
    });
  }

  calSeriesData(data): any[] {
    if (typeof(data) === 'object' && !Array.isArray(data)) {
      const seriesData = [];
      Object.keys(data).forEach(x => {
        seriesData.push({
            name: x,
            value: data[x]
          });
      });
      return seriesData;
    }
  }

}
