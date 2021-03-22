import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMatchDetailItemsComponent } from './table-match-detail-items.component';

describe('TableMatchDetailItemsComponent', () => {
  let component: TableMatchDetailItemsComponent;
  let fixture: ComponentFixture<TableMatchDetailItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMatchDetailItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMatchDetailItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
