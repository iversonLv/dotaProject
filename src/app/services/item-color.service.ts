import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class ItemColorService {

  constructor(
    private generalService: GeneralService
  ) { }

  getItemColorLocal(): Observable<any> {
    return this.generalService.getGitRawData('/item_colors.json');
  }
}
