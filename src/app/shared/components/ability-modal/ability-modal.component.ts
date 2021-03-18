import { Component, Input, OnInit } from '@angular/core';
// import { IAbility } from 'src/app/heros/model/ablities';
// import { HerosService } from 'src/app/heros/services/heros.service';

@Component({
  selector: 'app-ability-modal',
  templateUrl: './ability-modal.component.html',
  styleUrls: ['./ability-modal.component.scss']
})
export class AbilityModalComponent implements OnInit {
  @Input() pageXY: number[] = [0, 100];
  @Input() item: any;
  @Input() abilitiesTalentsLocal: any;

  // abilitiesTalentsLocal: any;

  constructor(
    // private herosService: HerosService,
  ) { }

  ngOnInit(): void {
    // this.getAbilitiesTalentsLocal();
  }

  // getAbilitiesTalentsLocal(): any {
  //   this.herosService.getAbilitiesTalentsLocal().subscribe(data => {
  //     this.abilitiesTalentsLocal = data;
  //     }, err => {
  //       console.log(err);
  //     });
  // }

}
