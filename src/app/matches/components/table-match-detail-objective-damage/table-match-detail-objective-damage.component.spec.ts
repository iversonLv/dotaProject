import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMatchDetailObjectiveDamageComponent } from './table-match-detail-objective-damage.component';

describe('TableMatchDetailObjectiveDamageComponent', () => {
  let component: TableMatchDetailObjectiveDamageComponent;
  let fixture: ComponentFixture<TableMatchDetailObjectiveDamageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMatchDetailObjectiveDamageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMatchDetailObjectiveDamageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
