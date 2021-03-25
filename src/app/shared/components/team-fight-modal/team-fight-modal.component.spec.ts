import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamFightModalComponent } from './team-fight-modal.component';

describe('TeamFightModalComponent', () => {
  let component: TeamFightModalComponent;
  let fixture: ComponentFixture<TeamFightModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamFightModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamFightModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
