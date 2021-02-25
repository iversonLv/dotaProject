import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCountsComponent } from './table-counts.component';

describe('TableCountsComponent', () => {
  let component: TableCountsComponent;
  let fixture: ComponentFixture<TableCountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
