import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldPopulationChartComponent } from './world-population-chart.component';

describe('WorldPopulationChartComponent', () => {
  let component: WorldPopulationChartComponent;
  let fixture: ComponentFixture<WorldPopulationChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldPopulationChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldPopulationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
