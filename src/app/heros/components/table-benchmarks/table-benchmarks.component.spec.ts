import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBenchmarksComponent } from './table-benchmarks.component';

describe('TableBenchmarksComponent', () => {
  let component: TableBenchmarksComponent;
  let fixture: ComponentFixture<TableBenchmarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableBenchmarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBenchmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
