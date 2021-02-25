import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTeamsHeroesComponent } from './table-teams-heroes.component';

describe('TableTeamsHeroesComponent', () => {
  let component: TableTeamsHeroesComponent;
  let fixture: ComponentFixture<TableTeamsHeroesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableTeamsHeroesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTeamsHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
