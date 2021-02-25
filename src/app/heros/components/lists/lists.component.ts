import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// model
import { IHero, IHeroData } from '../../model/hero';

// ngrx
import { Store } from '@ngrx/store';
import * as herosActions from '../../store/heros.actions';


@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  heroGeneral$: Observable<IHeroData>;

  constructor(
    private store: Store<{ heroGeneral: IHeroData}>,
  ) {
    this.heroGeneral$ = store.select('heroGeneral');
  }

  ngOnInit(): void {
    this.getHerosData();
  }

  getHerosData(): any {
     this.store.dispatch(new herosActions.LoadHerosGeneral());
  }

}
