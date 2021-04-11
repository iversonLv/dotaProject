import { Component, OnInit } from '@angular/core';

// material
import { MatDialog } from '@angular/material/dialog';

// dialogs
import { DialogPlayerListComponent } from '../shared/components/dialog-player-list/dialog-player-list.component';

// ngrx
import { Store } from '@ngrx/store';
import * as playersActions from 'src/app/players/store/players.actions';

// model
import { IPro, IProData } from '../players/model/pro';

// service
import { PlayersService } from '../players/services/players.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoading = false;

  proPlayersData: IPro[];
  countryDataLocal: any;
  latlongLocal: any;
  worldLocal: any;

  constructor(
    public dialog: MatDialog,
    private playersService: PlayersService,
    private store: Store<{ proPlayers: IProData }>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new playersActions.LoadProPlayers());
    this.store.select('proPlayers').subscribe(data => {
      this.isLoading = data.isLoading;
      if (!data.isLoading) {
        this.isLoading = data.isLoading;
        const proPlayers = [...data.pros];
        return this.proPlayersData = proPlayers;
      }
    }, err => {
      console.log(err);
    });

    // get all countries code from json
    this.getCountriesLocal();
    this.getLatlongLocal();
    this.getWorldLocal();
  }

  getCountriesLocal(): any {
    this.playersService.getCountriesLocal().subscribe(data => {
      this.countryDataLocal = data;
    }, err => {
      console.log(err);
    });
  }

  getLatlongLocal(): any {
    this.playersService.getLatlongLocal().subscribe(data => {
      this.latlongLocal = data;
    }, err => {
      console.log(err);
    });
  }

  getWorldLocal(): any {
    this.playersService.getWorldLocal().subscribe(data => {
      this.worldLocal = data;
    }, err => {
      console.log(err);
    });
  }

  emitClickSymble(e): any {
    this.dialog.open(DialogPlayerListComponent, {
      data: e,
      autoFocus: false
    });
  }

}
