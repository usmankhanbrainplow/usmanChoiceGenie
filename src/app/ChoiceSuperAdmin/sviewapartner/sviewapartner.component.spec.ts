import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SviewapartnerComponent } from './sviewapartner.component';

describe('SviewapartnerComponent', () => {
  let component: SviewapartnerComponent;
  let fixture: ComponentFixture<SviewapartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SviewapartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SviewapartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
