import { Component, Input, OnInit } from '@angular/core';
import { IItemLocal } from '../../model/item';

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.scss']
})
export class ItemModalComponent implements OnInit {
  @Input() pageXY: number[];
  @Input() item: IItemLocal;
  @Input() aghs: any;

  @Input() items: any;

  // @Input() pageXY: number[] = [0, 100];
  // @Input() item: IItemLocal = {
  //   hint: [
  // tslint:disable-next-line:max-line-length
  //     'Active: Swift Blink Teleport to a target point up to 1200 units away.After teleportation, you gain 30% phased movement speed, +40 Attack Speed, and +40 Attack Damage for 6 seconds. Swift Blink cannot be used for 3 seconds after taking damage from an enemy hero or Roshan.'
  //   ],
  //   id: 603,
  //   img: '/apps/dota2/images/items/swift_blink_lg.png?t=1593393829403',
  //   dname: 'Swift Blink',
  //   qual: 'component',
  //   cost: 6800,
  // tslint:disable-next-line:max-line-length
  //   notes: 'Self-casting will cause you to teleport in the direction of your team\'s fountain.\nIf you used Swift Blink to teleport to a distance over the maximum range, you\'ll be teleported 4/5 of the maximum range instead.',
  //   attrib: [
  //     {
  //       key: 'bonus_agility',
  //       header: '+',
  //       value: '25',
  //       footer: 'Agility'
  //     }
  //   ],
  //   mc: false,
  //   cd: 15,
  //   lore: 'A cunning blade able to anticipate and enable its bearer\'s movements.',
  //   components: [
  //     'blink',
  //     'eagle'
  //   ],
  //   created: true,
  //   charges: false
  // };

  constructor(
    // private itemsService: ItemsService,
  ) { }

  ngOnInit(): void {
    // this.getitems();
  }

  // getitems(): any {
  //   this.itemsService.getitems().subscribe(data => {
  //   this.items = data;
  //   }, err => {
  //     console.log(err);
  //   });
  // }

}
