import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralService } from 'src/app/services/general.service';

@Injectable({
  providedIn: 'root'
})
export class PatchService {

  constructor(
    private generalService: GeneralService,
  ) { }

  getPatchesLocal(): Observable<any> {
    return this.generalService.getGitRawData('/patch.json');
  }

  getPatchnoteLocal(): Observable<any> {
    return this.generalService.getGitRawData('/patchnotes.json');
  }
}
