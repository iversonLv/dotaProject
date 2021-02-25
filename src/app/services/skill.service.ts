import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(
    private generalService: GeneralService,
  ) { }

  getSkillLocal(): Observable<any> {
    return this.generalService.getGitRawData('/skills.json');
  }
}
