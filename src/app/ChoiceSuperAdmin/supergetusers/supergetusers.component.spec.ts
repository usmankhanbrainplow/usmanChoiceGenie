import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupergetusersComponent } from './supergetusers.component';

describe('SupergetusersComponent', () => {
  let component: SupergetusersComponent;
  let fixture: ComponentFixture<SupergetusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupergetusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupergetusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
