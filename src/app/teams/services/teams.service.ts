import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// service
import { GeneralService } from '../../services/general.service';

// model
import { ITeam } from '../model/team';
import { IHero } from '../model/hero';
import { IMatch } from '../model/match';
import { IPlayer } from '../model/player';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(
    private generalService: GeneralService,
  ) { }

  httpOptions = () => {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // tslint:disable-next-line:object-literal-key-quotes
      'Authorization': `Bearer 9738300E5F82FF7FC0B7F7DC6AFC605C`
    };
  }

  // GET Team data
  getTeamData(teamId: number): Observable<ITeam> {
    return this.generalService.get(`/teams/${teamId}`);
  }

  // GET Teams data
  getTeamsList(): Observable<ITeam[]> {
    return this.generalService.get(`/teams`);
  }

  // GET Teams mathes
  getTeamsMatches(teamId: number): Observable<IMatch[]> {
    return this.generalService.get(`/teams/${teamId}/matches`);
  }

  // GET Teams heroes
  getTeamsHeroes(teamId: number): Observable<IHero[]> {
    return this.generalService.get(`/teams/${teamId}/heroes`);
  }

  // GET Teams players
  getTeamsPlayers(teamId: number): Observable<IPlayer[]> {
    return this.generalService.get(`/teams/${teamId}/players`);
  }
}
