import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// ngrx
import { Store } from '@ngrx/store';
import * as searchActions from '../../../search/store/search.actions';
import * as playersActions from 'src/app/players/store/players.actions';
import * as matchesActions from 'src/app/matches/store/matches.actions';
import { GeneralService } from 'src/app/services/general.service';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
  searchTerm = '';
  searchQuery;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private generalService: GeneralService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.activatedRoute.queryParams.subscribe(data => {
      this.searchTerm = data.q;
    }, err => {
      console.log(err);
    });
  }


  doSearch(e): any {
    // when enter key down
    if (e.keyCode === 13 ) {
      this.router.navigate(['/search'], {
        queryParams: {
          q: e.target.value
        }
      });
      this.store.dispatch(new playersActions.LoadProPlayers());
      this.store.dispatch(new searchActions.LoadSearch({params: {q: e.target.value}}));

      // if e.target.value is only number will dispatch matches
      // first remove all prefix '000' then verfiy whether only input number
      if (/^[0-9]*$/.test(e.target.value.replace(/\b(0+)/gi, ''))) {
        this.store.dispatch(new matchesActions.LoadMatch(e.target.value.replace(/\b(0+)/gi, '')));
      }
    }
  }

  getUser(): any {
    return this.generalService.getUser().subscribe(user => {
      console.log(user);
    });
  }

}
