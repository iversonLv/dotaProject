import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav-title',
  templateUrl: './nav-title.component.html',
  styleUrls: ['./nav-title.component.scss']
})
export class NavTitleComponent implements OnInit {
  @Input() parentPage; // this is flag to determin how we split and slice currentUrl
  @Input() link; // this is for the nav link item , the text will be the route and display text
  @Input() title; // title for the link, because it's different

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  goPage(page: string): any {
    const currentUrl = this.router.url;
    let currentUrlParent;
    // if it's team detail, the rule is '/teams/{team_id}/[overview, matches, heroes, players]'
    // if it's player detail, the rule is '/teams/{team_id}/[overview, matches, ...]?'
    if (this.parentPage === 'teamDetail' || this.parentPage === 'playersDetail') {
      currentUrlParent = currentUrl.split('/').slice(0, 3).join('/');
    }
    const newPage = `${currentUrlParent}/${page}`;
    this.router.navigate([newPage]);
  }

}
