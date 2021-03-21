import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMatchDetailLastHitsComponent } from './table-match-detail-last-hits.component';

describe('TableMatchDetailLastHitsComponent', () => {
  let component: TableMatchDetailLastHitsComponent;
  let fixture: ComponentFixture<TableMatchDetailLastHitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMatchDetailLastHitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMatchDetailLastHitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
