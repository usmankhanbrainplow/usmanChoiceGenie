import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebenrollmentComponent } from './webenrollment.component';

describe('WebenrollmentComponent', () => {
  let component: WebenrollmentComponent;
  let fixture: ComponentFixture<WebenrollmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebenrollmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebenrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
