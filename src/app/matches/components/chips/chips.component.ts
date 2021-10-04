import { Component, Input, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { COMMA, ENTER } from '@angular/cdk/keycodes';

// material
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

// model
import { IheroLocal } from 'src/app/heros/model/heroLocal';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent implements OnInit {
  @Input() title: string;
  @Input() items: string[];
  @Input() allitems: string[];
  @Input() heroNames: IheroLocal;
  @Output() emitValue: EventEmitter<[string, boolean]> = new EventEmitter();

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  itemCtrl = new FormControl();
  filtereditems: Observable<string[]>;

  @ViewChild('itemInput') itemInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor() {
    this.filtereditems = this.itemCtrl.valueChanges.pipe(
      startWith(null),
      map((item: string | null) =>
        item ? this._filter(item) : this.allitems.slice()
      )
    );
  }

  ngOnInit(): void {
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our item
    if ((value || '').trim()) {
      this.allitems.forEach(i => {
        if (value === i && !this.items.includes(i)) {
          this.emitValue.emit([event.value.toLowerCase(), true]);
          return this.items.push(value.trim());
        } else {
          return null;
        }
      });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.itemCtrl.setValue(null);
  }

  remove(item: string): void {
    const index = this.items.indexOf(item);

    if (index >= 0) {
      this.items.splice(index, 1);
    }

    this.emitValue.emit([item.toLowerCase(), false]);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.allitems.forEach(x => {
      if (event.option.value === x && !this.items.includes(event.option.value)) {

        this.emitValue.emit([event.option.value.toLowerCase(), true]);
        return this.items.push(event.option.value);

      } else {
        return null;
      }
    });
    this.itemInput.nativeElement.value = '';
    this.itemCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allitems.filter(
      item => {
        return item.toLowerCase().indexOf(filterValue) > -1;
      }
    );
  }


}
