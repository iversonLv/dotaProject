import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmrComponent } from './mmr.component';

describe('MmrComponent', () => {
  let component: MmrComponent;
  let fixture: ComponentFixture<MmrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MmrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
