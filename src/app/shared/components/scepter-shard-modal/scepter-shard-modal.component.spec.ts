import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScepterShardModalComponent } from './scepter-shard-modal.component';

describe('ScepterShardModalComponent', () => {
  let component: ScepterShardModalComponent;
  let fixture: ComponentFixture<ScepterShardModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScepterShardModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScepterShardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
