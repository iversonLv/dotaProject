import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GeneralService } from 'src/app/services/general.service';

// model
import { IQueryParams } from 'src/app/shared/model/query-params';
import { IProMatch } from 'src/app/matches/model/pro-match';
import { IPublicMatch } from 'src/app/matches/model/public-match';



@Injectable({
  providedIn: 'root'
})
export class MatchesService {

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

  // get pro matches
  getProMatches(queryParams?: IQueryParams): Observable<IProMatch[]> {
    return this.generalService.get(`/proMatches`, queryParams);
  }

  // get public matches
  getPublicMatches(queryParams?: IQueryParams): Observable<IPublicMatch[]> {
    return this.generalService.get(`/publicMatches`, queryParams);
  }

  // get single match
  getSingleMatch(matchId: number): Observable<any> {
    return this.generalService.get(`/matches/${matchId}`);
  }

}
