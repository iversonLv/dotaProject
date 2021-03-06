import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePlayersRecordsComponent } from './table-players-records.component';

describe('TablePlayersRecordsComponent', () => {
  let component: TablePlayersRecordsComponent;
  let fixture: ComponentFixture<TablePlayersRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablePlayersRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePlayersRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
