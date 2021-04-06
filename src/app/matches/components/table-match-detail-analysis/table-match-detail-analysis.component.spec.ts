import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMatchDetailAnalysisComponent } from './table-match-detail-analysis.component';

describe('TableMatchDetailAnalysisComponent', () => {
  let component: TableMatchDetailAnalysisComponent;
  let fixture: ComponentFixture<TableMatchDetailAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMatchDetailAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMatchDetailAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
