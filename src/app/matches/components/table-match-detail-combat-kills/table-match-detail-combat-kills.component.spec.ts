import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMatchDetailCombatKillsComponent } from './table-match-detail-combat-kills.component';

describe('TableMatchDetailCombatKillsComponent', () => {
  let component: TableMatchDetailCombatKillsComponent;
  let fixture: ComponentFixture<TableMatchDetailCombatKillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMatchDetailCombatKillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMatchDetailCombatKillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
