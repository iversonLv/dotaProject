import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMatchDetailFantasyComponent } from './table-match-detail-fantasy.component';

describe('TableMatchDetailFantasyComponent', () => {
  let component: TableMatchDetailFantasyComponent;
  let fixture: ComponentFixture<TableMatchDetailFantasyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMatchDetailFantasyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMatchDetailFantasyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
