import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamfightsComponent } from './teamfights.component';

describe('TeamfightsComponent', () => {
  let component: TeamfightsComponent;
  let fixture: ComponentFixture<TeamfightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamfightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamfightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
