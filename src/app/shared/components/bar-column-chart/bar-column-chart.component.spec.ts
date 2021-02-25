import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarColumnChartComponent } from './bar-column-chart.component';

describe('BarColumnChartComponent', () => {
  let component: BarColumnChartComponent;
  let fixture: ComponentFixture<BarColumnChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarColumnChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarColumnChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
