import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IItemColorLocal } from 'src/app/shared/model/item_color';
import abilities from 'dotaconstants/build/abilities.json';

@Component({
  selector: 'app-patch-detail',
  templateUrl: './patch-detail.component.html',
  styleUrls: ['./patch-detail.component.scss'],
})
export class PatchDetailComponent implements OnInit {
  @ViewChild('item') item: ElementRef;
  @ViewChild('heroes') heroes: ElementRef;
  @Input() patchnote: any; // one patch note
  @Input() currentPatch: string;

  // uses for header patch release date
  @Input() extractPatchData: any;
  @Input() items: any;
  @Input() itemColors: IItemColorLocal;

  currentCat = 'general';
  abilities: any = abilities;

  constructor() {}

  ngOnInit(): void {}

  extractCurrentPatch(data: string): string {
    return data.replace('_', '.');
  }

  extractPatchFieldList(data: any): string[] {
    return Object.keys(data);
  }

  gotoAnchor(cat: string): void {
    this.currentCat = cat;
    let top;
    if (cat === 'item') {
      top = this.item.nativeElement.offsetTop - 120;
    } else if (cat === 'heroes') {
      top = this.heroes.nativeElement.offsetTop - 120;
    } else {
      // if top general cat, just scroll to top
      top = 0;
    }
    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  }

  extractHeroAbilityFromPatch(hero): any[] {
    let data = [];
    const heroPatches = this.patchnote.heroes[hero];
    let heroAbilitiesKeys = Object.keys(heroPatches).filter((i) =>
      i.includes(hero)
    );
    for (let heroAbilitiesKey of heroAbilitiesKeys) {
      let row = { name: null, patches: null };
      row.name = heroAbilitiesKey;
      row.patches = this.patchnote.heroes[hero][heroAbilitiesKey];
      data.push(row);
    }
    return data;
  }
}
