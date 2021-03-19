import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMatchDetailCombatDamageComponent } from './table-match-detail-combat-damage.component';

describe('TableMatchDetailCombatDamageComponent', () => {
  let component: TableMatchDetailCombatDamageComponent;
  let fixture: ComponentFixture<TableMatchDetailCombatDamageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMatchDetailCombatDamageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMatchDetailCombatDamageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
