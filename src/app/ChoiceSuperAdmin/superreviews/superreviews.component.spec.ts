import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperreviewsComponent } from './superreviews.component';

describe('SuperreviewsComponent', () => {
  let component: SuperreviewsComponent;
  let fixture: ComponentFixture<SuperreviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperreviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperreviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
