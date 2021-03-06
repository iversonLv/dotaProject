import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideService {

  constructor(
    private generalService: GeneralService,
  ) { }

  getSidesLocal(): Observable<any> {
    return this.generalService.getGitRawData('/sides.json');
  }
}
