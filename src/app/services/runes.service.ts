import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class RunesService {

  constructor(
    private generalService: GeneralService,
  ) { }

  getRunesLocal(): Observable<any> {
    return this.generalService.getGitRawData('/runes.json');
  }
}
