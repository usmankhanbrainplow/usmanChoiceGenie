import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupersubscriberComponent } from './supersubscriber.component';

describe('SupersubscriberComponent', () => {
  let component: SupersubscriberComponent;
  let fixture: ComponentFixture<SupersubscriberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupersubscriberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupersubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
