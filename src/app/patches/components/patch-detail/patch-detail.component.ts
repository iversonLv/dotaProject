import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IheroLocal } from 'src/app/heros/model/heroLocal';
import { IItemColorLocal } from 'src/app/shared/model/item_color';

@Component({
  selector: 'app-patch-detail',
  templateUrl: './patch-detail.component.html',
  styleUrls: ['./patch-detail.component.scss']
})
export class PatchDetailComponent implements OnInit {
  @ViewChild('items') items: ElementRef;
  @ViewChild('heroes') heroes: ElementRef;
  @Input() patchnote: any;
  @Input() currentPatch: any;

  // uses for header patch release date
  @Input() patchesLocalData: any;

  @Input() heroesNameLocal: IheroLocal;
  @Input() itemsLocal: any;
  @Input() itemColorLocal: IItemColorLocal;

  currentCat = 'general';

  constructor(
  ) { }

  ngOnInit(): void {
  }

  extractCurrentPatch(data: string): string {
    return data.replace('_', '.');
  }

  extractPatchFieldList(data: any): string[] {
    return Object.keys(data);
  }

  gotoAnchor(cat: string): void {
    this.currentCat = cat;
    let top;
    if (cat === 'items') {
      top = this.items.nativeElement.offsetTop - 120;
    } else if (cat === 'heroes') {
      top = this.heroes.nativeElement.offsetTop - 120;
    } else {
      // if top general cat, just scroll to top
      top = 0;
    }
    window.scrollTo({
        top,
        behavior: 'smooth'
    });
  }

}
