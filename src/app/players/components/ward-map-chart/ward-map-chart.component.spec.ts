import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WardMapChartComponent } from './ward-map-chart.component';

describe('WardMapChartComponent', () => {
  let component: WardMapChartComponent;
  let fixture: ComponentFixture<WardMapChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WardMapChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WardMapChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
