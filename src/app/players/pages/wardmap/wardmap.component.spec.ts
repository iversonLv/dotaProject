import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WardmapComponent } from './wardmap.component';

describe('WardmapComponent', () => {
  let component: WardmapComponent;
  let fixture: ComponentFixture<WardmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WardmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WardmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
