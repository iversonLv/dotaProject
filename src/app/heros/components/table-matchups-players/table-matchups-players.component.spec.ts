import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMatchupsPlayersComponent } from './table-matchups-players.component';

describe('TableMatchupsPlayersComponent', () => {
  let component: TableMatchupsPlayersComponent;
  let fixture: ComponentFixture<TableMatchupsPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMatchupsPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMatchupsPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
