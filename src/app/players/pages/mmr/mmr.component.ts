import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// ngrx
import { Store } from '@ngrx/store';
import * as playersActions from '../../store/players.actions';

// model
import { IRating, IRatingData } from '../../model/rating';

@Component({
  selector: 'app-mmr',
  templateUrl: './mmr.component.html',
  styleUrls: ['./mmr.component.scss']
})
export class MmrComponent implements OnInit {
  accountId;
  isLoading = false;
  ratings: IRating[] = [];
  constructor(
    private router: Router,
    private store: Store<{ playersRatings: IRatingData }>
  ) { }

  ngOnInit(): void {
    this.accountId = this.router.url.split('/')[2];
    this.store.dispatch(new playersActions.LoadPlayersRatings(this.accountId));
    this.store.select('playersRatings').subscribe(data => {
      this.isLoading = data.isLoading;
      if (!data.isLoading) {
        const newData = [];
        const ratingsData = [...data.ratings];
        for (const i of ratingsData) {
          const  { time } = i;
          newData.push({...i, time: time.slice(0, 10)});
        }
        this.isLoading = data.isLoading;
        return this.ratings = newData;
      }
    }, err => {
      console.log(err);
    });
  }

}
