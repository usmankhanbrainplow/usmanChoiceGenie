import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComProfileComponent } from './com-profile.component';

describe('ComProfileComponent', () => {
  let component: ComProfileComponent;
  let fixture: ComponentFixture<ComProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
