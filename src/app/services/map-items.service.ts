import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class MapItemsService {

  constructor(
    private generalService: GeneralService,
  ) { }

  getMapItemsLocal(): Observable<any> {
    return this.generalService.getGitRawData('/map_item.json');
  }
}
