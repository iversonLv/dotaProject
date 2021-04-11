import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-player-list',
  templateUrl: './dialog-player-list.component.html',
  styleUrls: ['./dialog-player-list.component.scss']
})
export class DialogPlayerListComponent implements OnInit {

  playerBaseTeamData = [];

  constructor(
    public dialogRef: MatDialogRef<DialogPlayerListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {}

  ngOnInit(): void {
    this.extractPlayersBaseSameTeam(this.data.players);
  }


  // extract Players list base team
  // So same team players will list together
  extractPlayersBaseSameTeam(data: any[]): any[] {
    let teamList = data.map(i => i.team_name);
    teamList = [...new Set(teamList)];

    teamList.forEach(i => {
      if (i !== null && i.trim() !== '') {
        this.playerBaseTeamData.push({
          team_name: i,
          players: data.filter(x => x.team_name === i)
        });
      }
    });

    const noTeam = data.filter(x => (x.team_name === null || x.team_name.trim() === ''));
    if (noTeam.length > 0) {
      this.playerBaseTeamData.push({
        team_name: '-No Team-',
        players: noTeam
      });
    }
    return this.playerBaseTeamData;
  }

  // extract players whether current or not
  extractPlayersCurrentLength(data: any[]): number {
    return data.filter(i => i.team_id !== 0).length;
  }
}
