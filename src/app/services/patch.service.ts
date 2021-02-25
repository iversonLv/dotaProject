import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class PatchService {

  constructor(
    private generalService: GeneralService,
  ) { }

  getPatchLocal(): Observable<any> {
    return this.generalService.getGitRawData('/patch.json');
  }
}
