import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

// ngrx
import { Store } from '@ngrx/store';
import * as teamsActions from '../../store/teams.actions';

// model
import { ITeamData } from '../../model/team';

@Component({
  selector: 'app-teams-hero',
  templateUrl: './teams-hero.component.html',
  styleUrls: ['./teams-hero.component.scss']
})
export class TeamsHeroComponent implements OnInit {
  teamsGeneral$: Observable<ITeamData>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{teamsGeneral: ITeamData}>
  ) {
    this.teamsGeneral$ = this.store.select('teamsGeneral');
  }

  ngOnInit(): void {
    const teamId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.store.dispatch(new teamsActions.LoadTeamsGeneral(teamId));
  }

}
