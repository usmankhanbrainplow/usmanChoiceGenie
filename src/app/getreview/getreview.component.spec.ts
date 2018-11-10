import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetreviewComponent } from './getreview.component';

describe('GetreviewComponent', () => {
  let component: GetreviewComponent;
  let fixture: ComponentFixture<GetreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
