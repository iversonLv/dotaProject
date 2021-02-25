import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTeamsMatchesComponent } from './table-teams-matches.component';

describe('TableTeamsMatchesComponent', () => {
  let component: TableTeamsMatchesComponent;
  let fixture: ComponentFixture<TableTeamsMatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableTeamsMatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTeamsMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
