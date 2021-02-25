import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePlayersComponent } from './table-players.component';

describe('TablePlayersComponent', () => {
  let component: TablePlayersComponent;
  let fixture: ComponentFixture<TablePlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablePlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
