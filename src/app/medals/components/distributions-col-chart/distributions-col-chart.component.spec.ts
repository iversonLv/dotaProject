import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionsColChartComponent } from './distributions-col-chart.component';

describe('DistributionsColChartComponent', () => {
  let component: DistributionsColChartComponent;
  let fixture: ComponentFixture<DistributionsColChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributionsColChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributionsColChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
