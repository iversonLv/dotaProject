import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralService } from '../../services/general.service';

// model
import { ISearch } from '../model/search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private generalService: GeneralService,
  ) { }

  getSearchList(searchQuery: string): Observable<ISearch[]> {
    return this.generalService.get(`/search`, searchQuery);
  }
}
