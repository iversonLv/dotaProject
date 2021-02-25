import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-players-nav',
  templateUrl: './players-nav.component.html',
  styleUrls: ['./players-nav.component.scss']
})
export class PlayersNavComponent implements OnInit {
  queryParams;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(data => this.queryParams = data);
  }

}
