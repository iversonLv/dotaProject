import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLineTeamfightComponent } from './time-line-teamfight.component';

describe('TimeLineTeamfightComponent', () => {
  let component: TimeLineTeamfightComponent;
  let fixture: ComponentFixture<TimeLineTeamfightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeLineTeamfightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeLineTeamfightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
