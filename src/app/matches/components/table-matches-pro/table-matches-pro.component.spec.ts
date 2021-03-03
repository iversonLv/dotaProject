import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMatchesProComponent } from './table-matches-pro.component';

describe('TableMatchesProComponent', () => {
  let component: TableMatchesProComponent;
  let fixture: ComponentFixture<TableMatchesProComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMatchesProComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMatchesProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
