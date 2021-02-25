import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class ItemGroupsService {

  constructor(
    private generalService: GeneralService
  ) { }

  getItemIdsLocal(): Observable<any> {
    return this.generalService.getGitRawData('/item_groups.json');
  }
}
