import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralService } from '../../services/general.service';

// model
import { IRecord } from '../model/record';


@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  constructor(
    private generalService: GeneralService
  ) { }

  // GET Records data
  getRecoresData(field: string): Observable<IRecord[]> {
    return this.generalService.get(`/records/${field}`);
  }
}
