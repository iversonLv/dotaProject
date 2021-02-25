import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHeroesComponent } from './table-heroes.component';

describe('TableHeroesComponent', () => {
  let component: TableHeroesComponent;
  let fixture: ComponentFixture<TableHeroesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableHeroesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
