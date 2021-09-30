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
  constructor() { }

  STEAMCDN = environment.STEAMCDN;
  ERROR_IMG = environment.ERROR_IMG;

  ngOnInit(): void {
  }

}
