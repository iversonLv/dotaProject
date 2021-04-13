import { Component, OnInit } from '@angular/core';

// model
import { IheroLocal } from 'src/app/heros/model/heroLocal';
import { IItemColorLocal } from 'src/app/shared/model/item_color';

// services
import { HerosService } from 'src/app/heros/services/heros.service';
import { PatchService } from 'src/app/patches/services/patch.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-patches',
  templateUrl: './patches.component.html',
  styleUrls: ['./patches.component.scss']
})
export class PatchesComponent implements OnInit {
  patchnoteLocal: any;
  patchesLocalData: any;
  heroesNameLocal: IheroLocal;
  itemsLocal: any;
  itemColorLocal: IItemColorLocal;

  overallPatchList: string[];

  patchItemsList: string[];
  patchHeroesList: string[];

  fixed = false;

  currentPatch;
  constructor(
    private itemsService: ItemsService,
    private herosService: HerosService,
    private patchService: PatchService,
  ) { }

  ngOnInit(): void {

    this.getPatchnoteLocal();
    this.getPatchesLocal();
    this.getHeroesNameLocal();
    this.getItemsLocal();
    this.getItemColorLocal();

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
    this.patchService.getPatchnoteLocal().subscribe(data => {
      this.patchnoteLocal = data;
      this.overallPatchList = Object.keys(data).reverse();
      this.currentPatch = Object.keys(data).reverse()[0];
    }, err => {
      console.log(err);
    });
  }

  getPatchesLocal(): any {
    this.patchService.getPatchesLocal().subscribe(data => {
      this.patchesLocalData = this.extractPatchData(data);
    }, err => {
      console.log(err);
    });
  }

  getItemsLocal(): any {
    this.itemsService.getItemsLocal().subscribe(data => {
    this.itemsLocal = data;
    }, err => {
      console.log(err);
    });
  }

  getItemColorLocal(): any {
    this.itemsService.getItemColorLocal().subscribe(data => {
      this.itemColorLocal = data;
    }, err => {
      console.log(err);
    });
  }

  // get hero local data base name
  getHeroesNameLocal(): any {
    this.herosService.getHeroesNameLocal().subscribe(data => {
      this.heroesNameLocal = data;
    }, err => {
      console.log(err);
    });
  }

  extractPatchData(data): any {
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
