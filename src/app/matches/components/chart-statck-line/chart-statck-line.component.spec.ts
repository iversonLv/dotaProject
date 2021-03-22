import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartStatckLineComponent } from './chart-statck-line.component';

describe('ChartStatckLineComponent', () => {
  let component: ChartStatckLineComponent;
  let fixture: ComponentFixture<ChartStatckLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartStatckLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartStatckLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
