import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private generalService: GeneralService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(data => {
      const steamId = data['openid.claimed_id'].split('/')[5];
      const accountId = Number(steamId.substr(-16, 16)) - 6561197960265728;
      localStorage.setItem('loginedAccountId', accountId + '');
      this.generalService.getAccountId();
      this.router.navigate([`players/${accountId}/overview`]);
    }, err => {
      console.log(err);
    });
  }

}
