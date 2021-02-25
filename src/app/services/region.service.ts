import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor(
    private generalService: GeneralService,
  ) { }

  getRegionLocal(): Observable<any> {
    return this.generalService.getGitRawData('/region.json');
  }
}
