import { Component, Input, OnInit } from '@angular/core';
import { ITalent } from 'src/app/heros/model/hero-abilities';
// import { HerosService } from 'src/app/heros/services/heros.service';

@Component({
  selector: 'app-talent-modal',
  templateUrl: './talent-modal.component.html',
  styleUrls: ['./talent-modal.component.scss']
})
export class TalentModalComponent implements OnInit {
  @Input() talents: ITalent[] = [];
  @Input() pageXY: number[] = [0, 100];
  @Input() abilitiesTalentsLocal: any;

  constructor(
    // private herosService: HerosService,
  ) { }

  ngOnInit(): void {
    // this.getAbilitiesTalentsLocal();
  }

  // getAbilitiesTalentsLocal(): any  {
  //   this.herosService.getAbilitiesTalentsLocal().subscribe(data => {
  //     this.abilitiesTalentsLocal = data;
  //   }, err => {
  //     console.log(err);
  //   });
  // }

}
