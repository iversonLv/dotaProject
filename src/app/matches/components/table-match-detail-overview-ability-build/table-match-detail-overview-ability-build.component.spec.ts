import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMatchDetailOverviewAbilityBuildComponent } from './table-match-detail-overview-ability-build.component';

describe('TableMatchDetailOverviewAbilityBuildComponent', () => {
  let component: TableMatchDetailOverviewAbilityBuildComponent;
  let fixture: ComponentFixture<TableMatchDetailOverviewAbilityBuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMatchDetailOverviewAbilityBuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMatchDetailOverviewAbilityBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
