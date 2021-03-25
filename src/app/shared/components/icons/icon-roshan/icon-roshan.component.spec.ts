import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconRoshanComponent } from './icon-roshan.component';

describe('IconRoshanComponent', () => {
  let component: IconRoshanComponent;
  let fixture: ComponentFixture<IconRoshanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconRoshanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconRoshanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
