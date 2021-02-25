import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class LobbyTypeService {

  constructor(
    private generalService: GeneralService,
  ) { }

  getLobbyTypeLocal(): Observable<any> {
    return this.generalService.getGitRawData('/lobby_type.json');
  }
}
