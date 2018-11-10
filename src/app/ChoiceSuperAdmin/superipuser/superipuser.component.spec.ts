import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperipuserComponent } from './superipuser.component';

describe('SuperipuserComponent', () => {
  let component: SuperipuserComponent;
  let fixture: ComponentFixture<SuperipuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperipuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperipuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
