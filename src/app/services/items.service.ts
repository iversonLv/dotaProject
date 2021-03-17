import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(
    private generalService: GeneralService
  ) { }

  // get all items
  getItemsLocal(): Observable<any> {
    return this.generalService.getGitRawData('/items.json');
  }

  // get item ids local
  // some response data is 'itemid': 'itemname
  getItemIdsLocal(): Observable<any> {
    return this.generalService.getGitRawData('/item_ids.json');
  }

  // get item color
  getItemColorLocal(): Observable<any> {
    return this.generalService.getGitRawData('/item_colors.json');
  }

  // get item group
  getItemGroupsLocal(): Observable<any> {
    return this.generalService.getGitRawData('/item_groups.json');
  }
}
