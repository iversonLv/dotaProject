import { Component, OnInit } from '@angular/core';

// model
import { IheroLocal } from 'src/app/heros/model/heroLocal';
import { IItemColorLocal } from 'src/app/shared/model/item_color';


// dotaconstans
import patchnotes from 'dotaconstants/build/patchnotes.json';
import patch from 'dotaconstants/build/patch.json';
import items from 'dotaconstants/build/items.json';
import heroNames from 'dotaconstants/build/hero_names.json';
import itemColors from 'dotaconstants/build/item_colors.json';

@Component({
  selector: 'app-patches',
  templateUrl: './patches.component.html',
  styleUrls: ['./patches.component.scss']
})
export class PatchesComponent implements OnInit {
  patchnotes: any;
  extractPatchData: any;
  heroNames: any;
  items: any;
  itemColors: IItemColorLocal;

  overallPatchList: string[];

  patchItemsList: string[];
  patchHeroesList: string[];

  fixed = false;

  currentPatch;
  constructor(
  ) {}

  ngOnInit(): void {
    this.extractPatchData = this.extractPatchDataFn(patch);
    this.heroNames = heroNames;
    this.items = items;
    this.itemColors = itemColors;
    this.getPatchnoteLocal();

    window.addEventListener('scroll', this.scroll, true);
  }

  scroll = (event): void => {
    if (event?.target?.className !== 'patch-list ng-star-inserted' && event?.target?.scrollingElement?.scrollTop > 60) {
      this.fixed = true;
    } else if (event?.target?.className !== 'patch-list ng-star-inserted' && event?.target?.scrollingElement?.scrollTop <= 60) {
      this.fixed = false;
    }
    // handle your scroll here
    // notice the 'odd' function assignment to a class field
    // this is used to be able to remove the event listener
  }

  getPatchnoteLocal(): any {
      this.patchnotes = patchnotes;
      this.overallPatchList = Object.keys(patchnotes).reverse();
      this.currentPatch = Object.keys(patchnotes).reverse()[0];
  }

  extractPatchDataFn(data): any {
    const nameList = data.map(i => i.name);
    const finalData = {};
    nameList.forEach(i => {
      finalData[i] = data.find(x => x.name === i);
    });
    return finalData;
  }

  emitCurrentPatch(e: string): any {
    this.currentPatch = e;
  }

}
