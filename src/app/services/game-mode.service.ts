import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class GameModeService {

  constructor(
    private generalService: GeneralService,
  ) { }

  getGameModeLocal(): Observable<any> {
    return this.generalService.getGitRawData('/game_mode.json');
  }
}
