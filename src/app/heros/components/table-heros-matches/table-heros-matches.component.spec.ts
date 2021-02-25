import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHerosMatchesComponent } from './table-heros-matches.component';

describe('TableHerosMatchesComponent', () => {
  let component: TableHerosMatchesComponent;
  let fixture: ComponentFixture<TableHerosMatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableHerosMatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableHerosMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
