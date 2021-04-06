import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMatchDetailTeamfightsComponent } from './table-match-detail-teamfights.component';

describe('TableMatchDetailTeamfightsComponent', () => {
  let component: TableMatchDetailTeamfightsComponent;
  let fixture: ComponentFixture<TableMatchDetailTeamfightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMatchDetailTeamfightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMatchDetailTeamfightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
