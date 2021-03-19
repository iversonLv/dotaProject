import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMatchDetailCombatDamageDetailComponent } from './table-match-detail-combat-damage-detail.component';

describe('TableMatchDetailCombatDamageDetailComponent', () => {
  let component: TableMatchDetailCombatDamageDetailComponent;
  let fixture: ComponentFixture<TableMatchDetailCombatDamageDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMatchDetailCombatDamageDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMatchDetailCombatDamageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
