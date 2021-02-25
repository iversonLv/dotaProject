import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistogramsComponent } from './histograms.component';

describe('HistogramsComponent', () => {
  let component: HistogramsComponent;
  let fixture: ComponentFixture<HistogramsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistogramsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistogramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
