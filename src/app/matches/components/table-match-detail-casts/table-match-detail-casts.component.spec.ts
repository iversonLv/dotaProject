import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMatchDetailCastsComponent } from './table-match-detail-casts.component';

describe('TableMatchDetailCastsComponent', () => {
  let component: TableMatchDetailCastsComponent;
  let fixture: ComponentFixture<TableMatchDetailCastsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMatchDetailCastsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMatchDetailCastsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
