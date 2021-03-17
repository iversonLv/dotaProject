import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class PermanentBuffsService {

  constructor(
    private generalService: GeneralService
  ) { }

  // get all items
  getPermanentBuffsLocal(): Observable<any> {
    return this.generalService.getGitRawData('/permanent_buffs.json');
  }
}
