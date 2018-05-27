import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypallButtonsComponent } from './paypall-buttons.component';

describe('PaypallButtonsComponent', () => {
  let component: PaypallButtonsComponent;
  let fixture: ComponentFixture<PaypallButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaypallButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaypallButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
