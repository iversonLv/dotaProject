import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-sub-nav',
  templateUrl: './sub-nav.component.html',
  styleUrls: ['./sub-nav.component.scss']
})
export class SubNavComponent implements OnInit {
  @Input() parentPage; // this is flag to determin how we split and slice currentUrl
  @Input() tooltips: string[] = []; // this is for records page
  @Input() links: string[];  // this is for the nav ngfor item ['overview', 'matches', ....], the text will be the route and display text
  queryParams;  // this is for player detail page which will have queryParams
  currentPage; // this is for active style for current page nav, currentPage === page

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const currentUrl = this.router.url;
    // so default for team deail and player detail page, when come to the page, nav item active style will be set
    if (this.parentPage === 'teamDetail'
    || this.parentPage === 'playersDetail'
    || this.parentPage === 'heroesDetail'
    || this.parentPage === 'matchesDetail') {
      this.currentPage = currentUrl.split('/')[3];
      if (currentUrl.split('/')[3] === undefined) {
        this.currentPage = 'overview';
      }
    } else if (this.parentPage === 'heroesList') {
      this.currentPage = currentUrl.split('/')[2];
      if (currentUrl.split('/')[2] === undefined) {
        this.currentPage = 'pro';
      }
    } else if (this.parentPage === 'matchesList') {
      this.currentPage = currentUrl.split('/')[2];
      if (currentUrl.split('/')[2] === undefined) {
        this.currentPage = 'pro';
      }
    } else if (this.parentPage === 'records') {
      this.currentPage = currentUrl.split('/')[2].split('_').splice(0).join(' ');
      if (currentUrl.split('/')[2] === undefined) {
        this.currentPage = 'duration';
      }
    } else if (this.parentPage === 'rank-tier') {
      this.currentPage = currentUrl.split('/')[2].split('_').splice(0).join(' ');
      if (currentUrl.split('/')[2] === undefined) {
        this.currentPage = 'distributions';
      }
    }
    this.activatedRoute.queryParamMap.subscribe(data => this.queryParams = data);

    // after we click <app-nav-title> to other page, the currentPage need update to url, so we use router event to trace the new page
    this.router.events
    .subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let currentRoute;
        // example url is /players/{{account_id}}/overview || /teams/{{team_id}}/overview
        // Grab last route 'overview'
        if (this.parentPage === 'teamDetail'
        || this.parentPage === 'playersDetail'
        || this.parentPage === 'heroesDetail'
        || this.parentPage === 'matchesDetail') {
          if (event.url.split('/')[3] === undefined) {
            if (this.parentPage === 'heroesDetail') {
              this.currentPage = 'rankings';
            } else {
              this.currentPage = 'overview';
            }
          } else {
            currentRoute = event.url.split('/')[3].split('?')[0];
            this.currentPage = currentRoute;
          }
        } else if (this.parentPage === 'heroesList') {
          if (event.url.split('/')[2] === undefined) {
            this.currentPage = 'pro';
          } else {
            currentRoute = event.url.split('/')[2].split('?')[0];
            this.currentPage = currentRoute;
          }
        } else if (this.parentPage === 'matchesList') {
          if (event.url.split('/')[2] === undefined) {
            this.currentPage = 'pro';
          } else {
            currentRoute = event.url.split('/')[2].split('?')[0];
            this.currentPage = currentRoute;
          }
        } else if (this.parentPage === 'records') {
          if (event.url.split('/')[2] === undefined ) {
            this.currentPage = 'duration';
          }
        } else if (this.parentPage === 'rank-tier') {
          if (event.url.split('/')[2] === undefined ) {
            this.currentPage = 'distributions';
          }
        }
      }
    });
  }

  goPage(page): any {
    this.currentPage = page; // some router has space, replace space with '-'
    const currentUrl = this.router.url;
    let currentUrlParent;
    // if it's team detail, the rule is '/teams/{team_id}/[overview, matches, heroes, players]'
    // if it's player detail, the rule is '/teams/{team_id}/[overview, matches, ...]?'
    if (this.parentPage === 'teamDetail'
    || this.parentPage === 'playersDetail'
    || this.parentPage === 'heroesDetail'
    || this.parentPage === 'matchesDetail') {
      currentUrlParent = currentUrl.split('/').slice(0, 3).join('/');
    } else if (this.parentPage === 'heroesList') {
      currentUrlParent = currentUrl.split('/').slice(0, 2).join('/');
    } else if (this.parentPage === 'matchesList') {
      currentUrlParent = currentUrl.split('/').slice(0, 2).join('/');
    } else if (this.parentPage === 'records') {
      currentUrlParent = currentUrl.split('/').slice(0, 2).join('/');
    } else if (this.parentPage === 'rank-tier') {
      currentUrlParent = currentUrl.split('/').slice(0, 2).join('/');
    }
    const newPage = `${currentUrlParent}/${page.replace(/\s/g, '_')}`;
    this.router.navigate([newPage], {
      relativeTo: this.activatedRoute,
      queryParams: this.queryParams.params,
      queryParamsHandling: 'merge',
    });
  }

}
