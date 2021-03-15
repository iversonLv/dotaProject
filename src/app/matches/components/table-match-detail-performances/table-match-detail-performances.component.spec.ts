import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMatchDetailPerformancesComponent } from './table-match-detail-performances.component';

describe('TableMatchDetailPerformancesComponent', () => {
  let component: TableMatchDetailPerformancesComponent;
  let fixture: ComponentFixture<TableMatchDetailPerformancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMatchDetailPerformancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMatchDetailPerformancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
