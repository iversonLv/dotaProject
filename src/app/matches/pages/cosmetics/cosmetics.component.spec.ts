import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CosmeticsComponent } from './cosmetics.component';

describe('CosmeticsComponent', () => {
  let component: CosmeticsComponent;
  let fixture: ComponentFixture<CosmeticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CosmeticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CosmeticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
