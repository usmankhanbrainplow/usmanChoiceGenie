import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperdashboardmainComponent } from './superdashboardmain.component';

describe('SuperdashboardmainComponent', () => {
  let component: SuperdashboardmainComponent;
  let fixture: ComponentFixture<SuperdashboardmainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperdashboardmainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperdashboardmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
