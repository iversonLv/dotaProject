import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMatchDetailActionsComponent } from './table-match-detail-actions.component';

describe('TableMatchDetailActionsComponent', () => {
  let component: TableMatchDetailActionsComponent;
  let fixture: ComponentFixture<TableMatchDetailActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMatchDetailActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMatchDetailActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
