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

  getItemsLocal(): Observable<any> {
    return this.generalService.getGitRawData('/items.json');
  }
}
