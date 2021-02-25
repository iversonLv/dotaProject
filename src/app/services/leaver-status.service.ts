import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class LeaverStatusService {

  constructor(
    private generalService: GeneralService,
  ) { }

  getLeaverStatusLocal(): Observable<any> {
    return this.generalService.getGitRawData('/leaver_status.json');
  }

}
