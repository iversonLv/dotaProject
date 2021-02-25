import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRankingsComponent } from './table-rankings.component';

describe('TableRankingsComponent', () => {
  let component: TableRankingsComponent;
  let fixture: ComponentFixture<TableRankingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableRankingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRankingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
