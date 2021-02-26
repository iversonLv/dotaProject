import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldPerMinComponent } from './gold-per-min.component';

describe('GoldPerMinComponent', () => {
  let component: GoldPerMinComponent;
  let fixture: ComponentFixture<GoldPerMinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoldPerMinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldPerMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
