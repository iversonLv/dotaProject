import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CosmeticModalComponent } from './cosmetic-modal.component';

describe('CosmeticModalComponent', () => {
  let component: CosmeticModalComponent;
  let fixture: ComponentFixture<CosmeticModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CosmeticModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CosmeticModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
