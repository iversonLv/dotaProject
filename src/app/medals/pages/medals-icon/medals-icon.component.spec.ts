import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedalsIconComponent } from './medals-icon.component';

describe('MedalsIconComponent', () => {
  let component: MedalsIconComponent;
  let fixture: ComponentFixture<MedalsIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedalsIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedalsIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
