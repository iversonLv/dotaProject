import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class ChatWheelService {

  constructor(
    private generalService: GeneralService,
  ) { }

  // get chatWheel
  getChatWheelLocal(): Observable<any> {
    return this.generalService.getLocalData('/chat_wheel.json');
  }
}
