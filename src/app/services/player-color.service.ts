import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerColorService {

  constructor(
    private generalService: GeneralService,
  ) { }

  getPlayerColorLocal(): Observable<any> {
    return this.generalService.getGitRawData('/player_colors.json');
  }
}
