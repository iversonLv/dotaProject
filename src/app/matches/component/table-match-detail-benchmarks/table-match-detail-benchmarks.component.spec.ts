import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMatchDetailBenchmarksComponent } from './table-match-detail-benchmarks.component';

describe('TableMatchDetailBenchmarksComponent', () => {
  let component: TableMatchDetailBenchmarksComponent;
  let fixture: ComponentFixture<TableMatchDetailBenchmarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMatchDetailBenchmarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMatchDetailBenchmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
