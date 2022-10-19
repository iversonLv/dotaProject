import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scepter-shard-modal',
  templateUrl: './scepter-shard-modal.component.html',
  styleUrls: ['./scepter-shard-modal.component.scss']
})
export class ScepterShardModalComponent implements OnInit {
  @Input() heroAghsDesc: any;
  @Input() pageXY: number[];
  constructor() { }

  ngOnInit(): void {
  }

}
