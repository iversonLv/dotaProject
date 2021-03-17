import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMatchDetailOverviewComponent } from './table-match-detail-overview.component';

describe('TableMatchDetailOverviewComponent', () => {
  let component: TableMatchDetailOverviewComponent;
  let fixture: ComponentFixture<TableMatchDetailOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMatchDetailOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMatchDetailOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
