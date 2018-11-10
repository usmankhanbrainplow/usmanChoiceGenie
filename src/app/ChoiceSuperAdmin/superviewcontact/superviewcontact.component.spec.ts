import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperviewcontactComponent } from './superviewcontact.component';

describe('SuperviewcontactComponent', () => {
  let component: SuperviewcontactComponent;
  let fixture: ComponentFixture<SuperviewcontactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperviewcontactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperviewcontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
