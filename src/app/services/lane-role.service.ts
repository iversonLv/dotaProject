import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class LaneRoleService {

  constructor(
    private generalService: GeneralService,
  ) { }

  getLaneRoleLocal(): Observable<any> {
    return this.generalService.getGitRawData('/lane_role.json');
  }
}
