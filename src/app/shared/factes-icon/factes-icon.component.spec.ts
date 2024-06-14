import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactesIconComponent } from './factes-icon.component';

describe('FactesIconComponent', () => {
  let component: FactesIconComponent;
  let fixture: ComponentFixture<FactesIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactesIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactesIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
