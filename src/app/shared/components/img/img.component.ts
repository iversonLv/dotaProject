import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit {
  @Input() data;
  @Input() altData = 'Dota2 img';
  @Input() opendotaUrl = false || null;
  @Input() localUrl = false || null;
  constructor() { }

  STEAMCDN = environment.STEAMCDN;
  OPENDOTA = environment.OPENDOTA;
  ERROR_IMG = environment.ERROR_IMG;

  srcUrl = this.opendotaUrl ? this.OPENDOTA : this.STEAMCDN;
  ngOnInit(): void {
  }

}
