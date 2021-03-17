import { Injectable } from '@angular/core';
import { GeneralService } from '../../services/general.service';

import { Observable } from 'rxjs';

// model
import { IHero } from '../model/hero';
import { IHeroStats } from '../model/heroStats';
import { IheroLocal } from '../model/heroLocal';
import { IHeroAbility } from '../model/hero-abilities';
import { IAbility } from '../model/ablities';
import { IRanking } from '../model/ranking';
import { IQuery } from 'src/app/players/model/query';
import { IBenchmark } from '../model/benchmark';
import { IMatch } from '../model/match';
import { IMatchupsDurationPlayer } from '../model/matchup-duration-player';

@Injectable({
  providedIn: 'root'
})
export class HerosService {

  constructor(
    private generalService: GeneralService,
  ) { }

  httpOptions = () => {
   return {
     Accept: 'application/json',
     'Content-type': 'application/json',
     Authorization: `Bearer 9738300E5F82FF7FC0B7F7DC6AFC605C`
   };
  }

  // get all heros
  getHeros(): Observable<IHero[]> {
    return this.generalService.get(`/heroes`);
  }

  // get hero stats
  getHeroStats(): Observable<any[]> {
    return this.generalService.get(`/heroStats`);
  }

  // get hero ranking
  getHerosRankings(queryParams?: IQuery): Observable<IRanking> {
    return this.generalService.get(`/rankings`, queryParams);
  }

  // get hero benchmark
  getHerosBenchmarks(queryParams?: IQuery): Observable<IBenchmark> {
    return this.generalService.get(`/benchmarks`, queryParams);
  }

  // get hero matches/recent
  getHerosMatches(heroId: number): Observable<IMatch[]> {
    return this.generalService.get(`/heroes/${heroId}/matches`);
  }

  // get hero matchups
  getHerosMatchups(heroId: number): Observable<IMatchupsDurationPlayer[]> {
    return this.generalService.get(`/heroes/${heroId}/matchups`);
  }

  // get hero druations
  getHerosDurations(heroId: number): Observable<IMatchupsDurationPlayer[]> {
    return this.generalService.get(`/heroes/${heroId}/durations`);
  }

  // get hero players
  getHerosPlayers(heroId: number): Observable<IMatchupsDurationPlayer[]> {
    return this.generalService.get(`/heroes/${heroId}/players`);
  }

  // get hero itemPopularity
  getHerosItemPopularity(heroId: number): Observable<any> {
    return this.generalService.get(`/heroes/${heroId}/itemPopularity`);
  }

  // get Hero local
  getHeroesLocal(): Observable<IheroLocal> {
    return this.generalService.getGitRawData(`/heroes.json`);
  }

  // get Hero name local
  getHeroesNameLocal(): Observable<IheroLocal> {
    return this.generalService.getGitRawData('/hero_names.json');
  }

  // get Hero ability local
  getHeroesAbilitiesTalentsLocal(): Observable<IHeroAbility> {
    return this.generalService.getGitRawData(`/hero_abilities.json`);
  }

  // get all abilities local
  getAbilitiesTalentsLocal(): Observable<IAbility> {
    return this.generalService.getGitRawData(`/abilities.json`);
  }

  // get all abilities local by id
  getAbilitiesByIdLocal(): Observable<any> {
    return this.generalService.getGitRawData(`/ability_ids.json`);
  }

}
