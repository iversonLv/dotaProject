import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPlayerListComponent } from './dialog-player-list.component';

describe('DialogPlayerListComponent', () => {
  let component: DialogPlayerListComponent;
  let fixture: ComponentFixture<DialogPlayerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPlayerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPlayerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
