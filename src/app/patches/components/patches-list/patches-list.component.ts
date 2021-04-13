import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-patches-list',
  templateUrl: './patches-list.component.html',
  styleUrls: ['./patches-list.component.scss']
})
export class PatchesListComponent implements OnInit {
  @Input() overallPatchList: string[];
  @Input() currentPatch: string;
  @Output() emitCurrentPatch: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  selectCurrentPatch(e: string): void {
    this.currentPatch = e;
    this.emitCurrentPatch.emit(e);
  }

}
