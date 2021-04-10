import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionMapComponent } from './vision-map.component';

describe('VisionMapComponent', () => {
  let component: VisionMapComponent;
  let fixture: ComponentFixture<VisionMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisionMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisionMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
