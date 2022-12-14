import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// dotaconstants
import heroes from 'dotaconstants/build/heroes.json';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() data;
  @Input() hasNone = true;
  @Input() order = 'asc';
  @Input() sortBy = 'id';
  @Input() model;
  @Input() defaultValue;
  @Input() forWhat: string | null;
  @Output() setEventEmit = new EventEmitter();

  // User for hero modal to mapping
  heroes: any = heroes;

  constructor() { }

  ngOnInit(): void {
  }


  selectionChange(event): any {
    const value = typeof(event.value) === 'string' ? +event.value : event.value;
    this.setEventEmit.emit(value);
  }

  reStructure(data): any {
    if (!Array.isArray(data)) {
      const datas = [];
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          datas.push(data[key]);
        }
      }
      return datas;
    } else {
      return data;
    }
  }

}
