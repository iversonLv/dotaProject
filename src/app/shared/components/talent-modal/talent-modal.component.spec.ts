import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentModalComponent } from './talent-modal.component';

describe('TalentModalComponent', () => {
  let component: TalentModalComponent;
  let fixture: ComponentFixture<TalentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
