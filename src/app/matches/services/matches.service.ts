import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GeneralService } from 'src/app/services/general.service';

// model
import { IQuery } from 'src/app/players/model/query';
import { IMatch } from 'src/app/matches/model/match';
import { IRecentMatch } from 'src/app/matches/model/recent-match';


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

}
