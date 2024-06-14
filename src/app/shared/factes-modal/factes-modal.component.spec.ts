import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactesModalComponent } from './factes-modal.component';

describe('FactesModalComponent', () => {
  let component: FactesModalComponent;
  let fixture: ComponentFixture<FactesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
