import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent implements OnInit {
  @Input() data;
  @Input() altData = 'Dota2 img';
  @Input() opendotaUrl = false;
  @Input() localUrl = false;
  @Input() general_img_url = false;
  srcUrl;
  constructor() {}

  STEAMCDN = environment.STEAMCDN;
  OPENDOTA = environment.OPENDOTA;
  ERROR_IMG = environment.ERROR_IMG;
  GENERAL_IMG_URL = environment.GENERAL_IMG_URL;

  ngOnInit(): void {
    if (this.opendotaUrl) {
      this.srcUrl = this.OPENDOTA;
    } else if (this.localUrl) {
      this.srcUrl = '';
    } else if (this.general_img_url) {
      this.srcUrl = this.GENERAL_IMG_URL;
    } else {
      this.srcUrl = this.STEAMCDN;
    }
  }
}
