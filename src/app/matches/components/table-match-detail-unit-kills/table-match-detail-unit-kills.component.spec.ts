import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMatchDetailUnitKillsComponent } from './table-match-detail-unit-kills.component';

describe('TableMatchDetailUnitKillsComponent', () => {
  let component: TableMatchDetailUnitKillsComponent;
  let fixture: ComponentFixture<TableMatchDetailUnitKillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMatchDetailUnitKillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMatchDetailUnitKillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
