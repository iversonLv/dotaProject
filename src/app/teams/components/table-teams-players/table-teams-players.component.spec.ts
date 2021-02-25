import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTeamsPlayersComponent } from './table-teams-players.component';

describe('TableTeamsPlayersComponent', () => {
  let component: TableTeamsPlayersComponent;
  let fixture: ComponentFixture<TableTeamsPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableTeamsPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTeamsPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
