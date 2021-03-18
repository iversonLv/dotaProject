import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMatchDetailRunesComponent } from './table-match-detail-runes.component';

describe('TableMatchDetailRunesComponent', () => {
  let component: TableMatchDetailRunesComponent;
  let fixture: ComponentFixture<TableMatchDetailRunesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMatchDetailRunesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMatchDetailRunesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
