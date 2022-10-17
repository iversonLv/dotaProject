import { Component, OnInit } from '@angular/core';

// dotaconstant
// import items from 'dotaconstants/build/items.json';
import items from '../../assets/data/items.json';
import itemColors from '../../assets/data/item_colors.json';
// import itemColors from 'dotaconstants/build/item_colors.json';
import itemIds from 'dotaconstants/build/item_ids.json';

// model
import { IItemColorLocal } from '../shared/model/item_color';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  itemColors: IItemColorLocal = itemColors;
  itemIds: any = itemIds;
  items: any = items;
  itemsArrList: any[] = Object.values(items);
  // tslint:disable-next-line:max-line-length
  itemsArr: any[] = this.itemsArrList.filter(i => !i.hidden && !!i.dname && (!i.dname.includes('Recipe') && !i.dname.includes('Roshan') && !i.dname.includes('River Vial:') && !i.dname.includes('Pocket')));
  itemsListBasic: any[] = this.itemsArr.filter(i => !i.components && !i.tier);
  itemsListBasicObj = {
    Consumables: this.itemsListBasic.filter(i => i.category === 'consumables'),
    Attributes: this.itemsListBasic.filter(i => i.category === 'attributes'),
    Equipment: this.itemsListBasic.filter(i => i.category === 'equipment'),
    Secret: this.itemsListBasic.filter(i => i.category === 'secret'),
    Miscellaneous: this.itemsListBasic.filter(i => i.category === 'miscellaneous'),
  };
  itemsListBasicQuals = ['Consumables', 'Attributes', 'Equipment', 'Miscellaneous', 'Secret'];

  itemsListUpgraded: any[] = this.itemsArr.filter(i => !!i.components && !i.tier && !i.img.includes('dagon_') && !i.img.includes('necronomicon_'));
  itemsListUpgradedObj = {
    Accessories: this.itemsListUpgraded.filter(i => i.category === 'accessories'),
    Support: this.itemsListUpgraded.filter(i => i.category === 'support'),
    Magical: this.itemsListUpgraded.filter(i => i.category === 'magical'),
    Armor: this.itemsListUpgraded.filter(i => i.category === 'armor'),
    Weapons: this.itemsListUpgraded.filter(i => i.category === 'weapons'),
    Artifacts: this.itemsListUpgraded.filter(i => i.category === 'artifacts')
  };

  itemsListUpgradedQuals = ['Accessories', 'Support', 'Magical',  'Armor', 'Weapons', 'Artifacts'];
  neutralItems1: any[] = this.itemsArr.filter(i => !!i.tier && i.tier === 1);
  neutralItems2: any[] = this.itemsArr.filter(i => !!i.tier && i.tier === 2);
  neutralItems3: any[] = this.itemsArr.filter(i => !!i.tier && i.tier === 3);
  neutralItems4: any[] = this.itemsArr.filter(i => !!i.tier && i.tier === 4);
  neutralItems5: any[] = this.itemsArr.filter(i => !!i.tier && i.tier === 5);
  neutralItems: any[] = [this.neutralItems1, this.neutralItems2, this.neutralItems3, this.neutralItems4, this.neutralItems5];

  neutralItemsInfo = [
    {
      dropTime: '07:00+',
      dropRate: '14%',
      rarity: 'low',
    },
    {
      dropTime: '17:00+',
      dropRate: '10%',
      rarity: 'common',
    },
    {
      dropTime: '27:00+',
      dropRate: '10%',
      rarity: 'consumable',
    },
    {
      dropTime: '37:00+',
      dropRate: '10%',
      rarity: 'epic',
    },
    {
      dropTime: '60:00+',
      dropRate: '10%',
      rarity: 'artifact',
    },
  ];

  // modal
  pageXY = [];
  showItemModal = false;
  currentMouseOverItem: any = null;
  constructor() { }

  ngOnInit(): void {
  }

  showItemModalFn(e, id, right): any {
    // left most modal will out of the screen
    if (right) {
      this.pageXY = [e.pageX + 50, e.pageY - 120];
    } else {
      this.pageXY = [e.pageX - 350, e.pageY - 120];
    }
    this.showItemModal = true;
    this.currentMouseOverItem = this.items[this.itemIds[id]];
  }

}
